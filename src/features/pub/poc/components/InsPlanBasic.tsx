'use client';

import { FormCell, FormTable, Gcol, Typo, FormItem, ButtonGroup } from '@/shared/components/common';
import { Separator } from '@/shared/components/common';
import { SearchIcon } from '@/shared/components/icons';
import { TableRow, Input, Button, NativeSelect, NativeSelectOption } from '@/shared/components/uiux';

export function InsPlanBasic() {
  return (
    <Gcol variant="box">
      <div className="flex items-center justify-between gap-4 w-full">
        <FormItem className="gap-4 flex-1">
          <Typo tag="h2" variant="heading-lg">
            한화 시그니처 여성 3N5 간편건강보험 3.0 2504
          </Typo>
          <NativeSelect aria-label="형 선택" readOnly={false} required={false} width="xl">
            <NativeSelectOption value="1">기본형 납입면제 이름 길게 표현할때 말줄임 필요</NativeSelectOption>
            <NativeSelectOption value="2">간편형 납입면제 </NativeSelectOption>
          </NativeSelect>
        </FormItem>
        <ButtonGroup>
          <Button color="secondary" variant="outlined" size="md">
            추천플랜
          </Button>
          <Button color="secondary" variant="contained" size="md">
            마이플랜
          </Button>
        </ButtonGroup>
      </div>
      <hr className="border-t-[0.1rem] border-t-[#E5E5E5] m-0 w-full" />
      <FormTable variant="boxIn" caption="상품,가입연령 검색테이블입니다." cols={['w-[10rem] min-w-[10rem]', '']}>
        <TableRow>
          <FormCell title="설계번호">
            <Input type="text" aria-label="설계번호 앞자리" width="lg" />
            <Separator>-</Separator>
            <Input type="text" aria-label="설계번호 뒷자리" width="lg" />
            <FormItem className="w-max ml-2">
              <Input type="text" aria-label="라벨명모름" defaultValue="880101-1 김한화" />
              <Button aria-label="계약자 추가" variant="none" size="icon-md">
                <SearchIcon />
              </Button>
            </FormItem>
          </FormCell>
        </TableRow>
      </FormTable>
    </Gcol>
  );
}
