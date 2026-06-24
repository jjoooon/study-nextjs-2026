import * as React from 'react';

export interface GridDataConfig<T = unknown> {
  key: string;
  dummyItems: T[];
  underSliceCount?: number;
}

export interface UseStorybookGridDataParams<T = unknown> {
  dataType: 'none' | 'under' | 'over';
  delayTime: number;
  grids: GridDataConfig<T>[];
}

export const useStorybookGridData = <T = unknown>(params: UseStorybookGridDataParams<T>) => {
  const { dataType, delayTime, grids } = params;

  // grids의 구조가 변경되었는지 확인하기 위한 직렬화 키 생성
  const gridsKeyString = grids.map((g) => `${g.key}-${g.dummyItems.length}-${g.underSliceCount}`).join(',');

  // grids의 참조가 리렌더링 시마다 새로 생성되는 것을 막기 위해 gridsKeyString 기반으로 메모이제이션합니다.
  const memoizedGrids = React.useMemo(() => {
    return grids;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridsKeyString]);

  // 데이터 가공 함수들을 useCallback으로 캡슐화
  const getSlicedData = React.useCallback(() => {
    const dataMap: Record<string, T[]> = {};
    memoizedGrids.forEach((grid) => {
      let data: T[] = [];
      if (dataType === 'under') {
        const sliceCount = grid.underSliceCount ?? 2;
        data = grid.dummyItems.slice(0, sliceCount);
      } else if (dataType === 'over') {
        data = grid.dummyItems;
      }
      dataMap[grid.key] = data;
    });
    return dataMap;
  }, [dataType, memoizedGrids]);

  const getEmptyData = React.useCallback(() => {
    const emptyMap: Record<string, T[]> = {};
    memoizedGrids.forEach((grid) => {
      emptyMap[grid.key] = [];
    });
    return emptyMap;
  }, [memoizedGrids]);

  // props가 변경되었을 때 렌더링 단계에서 상태를 동기적으로 리셋하여 react-hooks/set-state-in-effect 경고를 방지합니다.
  const [prevParams, setPrevParams] = React.useState({ dataType, delayTime, gridsKeyString });
  const [isLoading, setIsLoading] = React.useState(delayTime > 0);
  const [resolvedData, setResolvedData] = React.useState<Record<string, T[]>>(() => {
    return delayTime > 0 ? getEmptyData() : getSlicedData();
  });

  const isPropsChanged =
    dataType !== prevParams.dataType ||
    delayTime !== prevParams.delayTime ||
    gridsKeyString !== prevParams.gridsKeyString;

  if (isPropsChanged) {
    setPrevParams({ dataType, delayTime, gridsKeyString });
    setIsLoading(delayTime > 0);
    setResolvedData(delayTime > 0 ? getEmptyData() : getSlicedData());
  }

  React.useEffect(() => {
    if (delayTime <= 0) {
      return;
    }

    const timer = setTimeout(() => {
      setResolvedData(getSlicedData());
      setIsLoading(false);
    }, delayTime);

    return () => clearTimeout(timer);
  }, [delayTime, getSlicedData]);

  return {
    isLoading,
    resolvedData,
  };
};
