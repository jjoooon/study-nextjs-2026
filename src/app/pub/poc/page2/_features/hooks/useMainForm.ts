'use client';

import { useState, useCallback } from 'react';
import { MOCK_DATA } from '../constants/main';
import type { TabKey } from '../constants/main';
import type { InsuredData, TabData } from '../types/main';

export function useMainForm(activeTab: TabKey) {
  const [modifiedData, setModifiedData] = useState<Record<string, Partial<TabData>>>({});
  const [activeInsuredByTab, setActiveInsuredByTab] = useState<Record<string, number>>({});
  const [modifiedInsured, setModifiedInsured] = useState<Record<string, Record<number, Partial<InsuredData>>>>({});

  const activeInsured = activeInsuredByTab[activeTab] ?? 0;

  // 현재 탭의 전체 데이터 가져오기
  const getCurrentData = useCallback((): TabData => {
    const fallbackKey = Object.keys(MOCK_DATA)[0];
    const baseData = MOCK_DATA[activeTab] ?? (fallbackKey ? MOCK_DATA[fallbackKey] : undefined);
    if (!baseData) {
      return {
        id: '',
        name: '',
        personalInfoPath: '',
        deliveryType: '',
        deliveryAddress: '',
        deliveryDetailAddress: '',
        planType: '',
        planOption: '',
        deliveryTerm: '',
        deliveryOption: '',
        maturityTerm: '',
        maturityOption: '',
        paymentCycle: '',
        noticeType: '',
        insuranceStartDate: '',
        insurancePeriod: ['', ''],
        insured: [],
      };
    }

    const base = {
      ...baseData,
      ...modifiedData[activeTab],
    };
    if (base.insured && modifiedInsured[activeTab]) {
      base.insured = base.insured.map((insured, index) => ({
        ...insured,
        ...(modifiedInsured[activeTab][index] || {}),
      }));
    }
    return base;
  }, [activeTab, modifiedData, modifiedInsured]);

  // 입력값 변경 핸들러
  const handleChange = useCallback(
    (field: keyof TabData, value: string | [string, string]) => {
      setModifiedData((prev) => ({
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          [field]: value,
        },
      }));
    },
    [activeTab]
  );

  // 피보험자 데이터 변경 핸들러
  const handleInsuredChange = useCallback(
    (insuredIndex: number, field: keyof InsuredData, value: string) => {
      setModifiedInsured((prev) => ({
        ...prev,
        [activeTab]: {
          ...(prev[activeTab] || {}),
          [insuredIndex]: {
            ...(prev[activeTab]?.[insuredIndex] || {}),
            [field]: value,
          },
        },
      }));
    },
    [activeTab]
  );

  // 피보험자 탭 변경 핸들러
  const handleInsuredTabChange = useCallback(
    (value: string) => {
      setActiveInsuredByTab((prev) => ({
        ...prev,
        [activeTab]: Number(value),
      }));
    },
    [activeTab]
  );

  // 피보험자 삭제 핸들러
  const handleRemoveInsured = useCallback(
    (index: number) => {
      const currentData = getCurrentData();
      if (currentData.insured) {
        const updatedInsured = currentData.insured.filter((_, i) => i !== index);
        setModifiedData((prev) => ({
          ...prev,
          [activeTab]: {
            ...(prev[activeTab] || {}),
            insured: updatedInsured,
          },
        }));
        if (activeInsuredByTab[activeTab] >= updatedInsured.length && activeInsuredByTab[activeTab] > 0) {
          setActiveInsuredByTab((prev) => ({
            ...prev,
            [activeTab]: activeInsured - 1,
          }));
        }
      }
    },
    [activeTab, getCurrentData, activeInsured, activeInsuredByTab]
  );

  // 현재 피보험자 데이터 가져오기
  const getInsuredData = useCallback(
    (index: number): InsuredData | undefined => {
      const currentData = getCurrentData();
      if (!currentData.insured || !currentData.insured[index]) return undefined;
      return {
        ...currentData.insured[index],
        ...(modifiedInsured[activeTab]?.[index] || {}),
      };
    },
    [activeTab, getCurrentData, modifiedInsured]
  );

  return {
    activeInsured,
    currentData: getCurrentData(),
    modifiedData,
    modifiedInsured,
    activeInsuredByTab,
    handleChange,
    handleInsuredChange,
    handleInsuredTabChange,
    handleRemoveInsured,
    getInsuredData,
  };
}
