/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import type { ICellRendererParams, ColDef, ValueFormatterParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { cn } from '@/shared/lib/shadcn/utils';
import { numberValueFormatter, createTooltipValueGetter, useDynamicColumnWidths } from '@aggrid';
import { Grow, Typo, Gcol, Grid } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { HeaderWithUnit } from '@grid/HeadRenderers';

import { Ai2Icon, CheckIcon } from '@icons';
import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogSection,
  DialogTitle,
  DialogFooterArea,
  DialogClose,
} from '@uiux/Dialog';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';

/**
 * AI인수지침 위배해소 그리드용 행 데이터 타입
 */
type DummyDataType = {
  id: number;
  field01: string; // 순번
  field02: string | number; // 담보명
  insuredAmount: string | number; // 현재 가입금액
  premium: string | number; // 현재 보험료
  insuredAmountA: string | number; // A안 가입금액
  premiumA: string | number; // A안 보험료
  insuredAmountB: string | number; // B안 가입금액
  premiumB: string | number; // B안 보험료
  insuredAmountC: string | number; // C안 가입금액
  premiumC: string | number; // C안 보험료
};

/**
 * 인수지침 위배 담보 목록 및 각 제안(A안, B안, C안)별 조정 금액 더미 데이터
 */
const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: '1',
    field02: '보통약관(상해사망)',
    insuredAmount: 5000,
    premium: 700,
    insuredAmountA: 5000,
    premiumA: 700,
    insuredAmountB: 5000,
    premiumB: 700,
    insuredAmountC: 5000,
    premiumC: 700,
  },
  {
    id: 2,
    field01: '2',
    field02: '보험료납입면제대상보장(6대사유Ⅱ)',
    insuredAmount: 10,
    premium: 154,
    insuredAmountA: 10,
    premiumA: 154,
    insuredAmountB: 10,
    premiumB: 154,
    insuredAmountC: 10,
    premiumC: 154,
  },
  {
    id: 3,
    field01: '6',
    field02: '보장보험료50%납입지원Ⅱ(4대유사암)',
    insuredAmount: 5,
    premium: 2769,
    insuredAmountA: 5,
    premiumA: 2769,
    insuredAmountB: 5,
    premiumB: 2769,
    insuredAmountC: 5,
    premiumC: 2769,
  },
  {
    id: 4,
    field01: '46',
    field02: '4대유사암진단비',
    insuredAmount: 2400,
    premium: 3132,
    insuredAmountA: 2400,
    premiumA: 3132,
    insuredAmountB: 2400,
    premiumB: 3132,
    insuredAmountC: 2400,
    premiumC: 3132,
  },
  {
    id: 5,
    field01: '',
    field02: '4대유사암진단비(기타피부암)',
    insuredAmount: 600,
    premium: 240,
    insuredAmountA: 600,
    premiumA: 240,
    insuredAmountB: 600,
    premiumB: 240,
    insuredAmountC: 600,
    premiumC: 240,
  },
  {
    id: 6,
    field01: '',
    field02: '4대유사암진단비(제자리암)',
    insuredAmount: 600,
    premium: 1248,
    insuredAmountA: 600,
    premiumA: 1248,
    insuredAmountB: 600,
    premiumB: 1248,
    insuredAmountC: 600,
    premiumC: 1248,
  },
  {
    id: 7,
    field01: '',
    field02: '4대유사암진단비(경계성종양)',
    insuredAmount: 600,
    premium: 228,
    insuredAmountA: 600,
    premiumA: 228,
    insuredAmountB: 600,
    premiumB: 228,
    insuredAmountC: 600,
    premiumC: 228,
  },
  {
    id: 8,
    field01: '',
    field02: '4대유사암진단비(갑상선암)',
    insuredAmount: 600,
    premium: 1416,
    insuredAmountA: 600,
    premiumA: 1416,
    insuredAmountB: 600,
    premiumB: 1416,
    insuredAmountC: 600,
    premiumC: 1416,
  },
  {
    id: 9,
    field01: '58',
    field02: '여성통합암(4대유사암제외)진단비Ⅱ',
    insuredAmount: 39000,
    premium: 31440,
    insuredAmountA: 26000,
    premiumA: 20700,
    insuredAmountB: 39000,
    premiumB: 31440,
    insuredAmountC: 39000,
    premiumC: 31440,
  },
  {
    id: 10,
    field01: '',
    field02: '여성통합암(4대유사암제외)진단비Ⅱ(대장암)',
    insuredAmount: 3000,
    premium: 4200,
    insuredAmountA: 2000,
    premiumA: 2740,
    insuredAmountB: 3000,
    premiumB: 4200,
    insuredAmountC: 3000,
    premiumC: 4200,
  },
  {
    id: 11,
    field01: '',
    field02: '여성통합암(4대유사암제외)진단비Ⅱ(특정소화기관암)',
    insuredAmount: 3000,
    premium: 7050,
    insuredAmountA: 2000,
    premiumA: 4600,
    insuredAmountB: 3000,
    premiumB: 7050,
    insuredAmountC: 3000,
    premiumC: 7050,
  },
  {
    id: 12,
    field01: '',
    field02: '여성통합암(4대유사암제외)진단비Ⅱ(유방암)',
    insuredAmount: 3000,
    premium: 8700,
    insuredAmountA: 2000,
    premiumA: 5800,
    insuredAmountB: 3000,
    premiumB: 8700,
    insuredAmountC: 3000,
    premiumC: 8700,
  },
  {
    id: 13,
    field01: '',
    field02: '여성통합암(4대유사암제외)진단비Ⅱ(자궁관련암)',
    insuredAmount: 3000,
    premium: 2400,
    insuredAmountA: 2000,
    premiumA: 1600,
    insuredAmountB: 3000,
    premiumB: 2400,
    insuredAmountC: 3000,
    premiumC: 2400,
  },
  {
    id: 14,
    field01: '',
    field02: '여성통합암(4대유사암제외)진단비Ⅱ(난소암)',
    insuredAmount: 3000,
    premium: 900,
    insuredAmountA: 2000,
    premiumA: 600,
    insuredAmountB: 3000,
    premiumB: 900,
    insuredAmountC: 3000,
    premiumC: 900,
  },
  {
    id: 15,
    field01: '',
    field02: '여성통합암(4대유사암제외)진단비Ⅱ(특정여성생식기관암)',
    insuredAmount: 3000,
    premium: 120,
    insuredAmountA: 2000,
    premiumA: 80,
    insuredAmountB: 3000,
    premiumB: 120,
    insuredAmountC: 3000,
    premiumC: 120,
  },
  {
    id: 16,
    field01: '',
    field02: '여성통합암(4대유사암제외)진단비Ⅱ(비뇨기관암(요로암))',
    insuredAmount: 3000,
    premium: 1050,
    insuredAmountA: 2000,
    premiumA: 680,
    insuredAmountB: 3000,
    premiumB: 1050,
    insuredAmountC: 3000,
    premiumC: 1050,
  },
  {
    id: 17,
    field01: '',
    field02: '여성통합암(4대유사암제외)진단비Ⅱ(폐암)',
    insuredAmount: 3000,
    premium: 3060,
    insuredAmountA: 2000,
    premiumA: 1980,
    insuredAmountB: 3000,
    premiumB: 3060,
    insuredAmountC: 3000,
    premiumC: 3060,
  },
  {
    id: 18,
    field01: '',
    field02: '여성통합암(4대유사암제외)진단비Ⅱ(특정호흡기및흉곽내기관암)',
    insuredAmount: 3000,
    premium: 270,
    insuredAmountA: 2000,
    premiumA: 180,
    insuredAmountB: 3000,
    premiumB: 270,
    insuredAmountC: 3000,
    premiumC: 270,
  },
  {
    id: 19,
    field01: '',
    field02: '여성통합암(4대유사암제외)진단비Ⅱ(눈,뇌,중추신경계통및내분비선암)',
    insuredAmount: 3000,
    premium: 330,
    insuredAmountA: 2000,
    premiumA: 220,
    insuredAmountB: 3000,
    premiumB: 330,
    insuredAmountC: 3000,
    premiumC: 330,
  },
  {
    id: 20,
    field01: '',
    field02: '여성통합암(4대유사암제외)진단비Ⅱ(입술,구강및인두암)',
    insuredAmount: 3000,
    premium: 390,
    insuredAmountA: 2000,
    premiumA: 260,
    insuredAmountB: 3000,
    premiumB: 390,
    insuredAmountC: 3000,
    premiumC: 390,
  },
  {
    id: 21,
    field01: '',
    field02: '여성통합암(4대유사암제외)진단비Ⅱ(뼈,관절,악성흑색종,중피성및연조직암)',
    insuredAmount: 3000,
    premium: 510,
    insuredAmountA: 2000,
    premiumA: 340,
    insuredAmountB: 3000,
    premiumB: 510,
    insuredAmountC: 3000,
    premiumC: 510,
  },
  {
    id: 22,
    field01: '',
    field02: '여성통합암(4대유사암제외)진단비Ⅱ(림프및조혈관련특정암)',
    insuredAmount: 3000,
    premium: 2460,
    insuredAmountA: 2000,
    premiumA: 1620,
    insuredAmountB: 3000,
    premiumB: 2460,
    insuredAmountC: 3000,
    premiumC: 2460,
  },
  {
    id: 23,
    field01: '162',
    field02: '암(4대유사암제외)특정치료비(암전문의료기관Ⅱ(상급종합병원등))(각연간1회한)',
    insuredAmount: 9000,
    premium: 36000,
    insuredAmountA: 9000,
    premiumA: 36000,
    insuredAmountB: 8500,
    premiumB: 35375,
    insuredAmountC: 9000,
    premiumC: 36000,
  },
  {
    id: 24,
    field01: '',
    field02: '암(4대유사암제외)특정치료비(수술)(암전문의료기관Ⅱ(상급종합병원등))(연간1회한)',
    insuredAmount: 2000,
    premium: 12040,
    insuredAmountA: 2000,
    premiumA: 12040,
    insuredAmountB: 2000,
    premiumB: 11940,
    insuredAmountC: 2000,
    premiumC: 12040,
  },
  {
    id: 25,
    field01: '',
    field02: '암(4대유사암제외)특정치료비(항암방사선치료)(암전문의료기관Ⅱ(상급종합병원등))(연간1회한)',
    insuredAmount: 2000,
    premium: 8140,
    insuredAmountA: 2000,
    premiumA: 8140,
    insuredAmountB: 2000,
    premiumB: 8080,
    insuredAmountC: 2000,
    premiumC: 8140,
  },
  {
    id: 26,
    field01: '',
    field02: '암(4대유사암제외)특정치료비(항암약물치료)(암전문의료기관Ⅱ(상급종합병원등))(연간1회한)',
    insuredAmount: 2000,
    premium: 14980,
    insuredAmountA: 2000,
    premiumA: 14980,
    insuredAmountB: 2000,
    premiumB: 14860,
    insuredAmountC: 2000,
    premiumC: 14980,
  },
  {
    id: 27,
    field01: '',
    field02: '암(4대유사암제외)특정치료비(중환자실치료)(암전문의료기관Ⅱ(상급종합병원등))(연간1회한)',
    insuredAmount: 1000,
    premium: 680,
    insuredAmountA: 1000,
    premiumA: 680,
    insuredAmountB: 500,
    premiumB: 335,
    insuredAmountC: 1000,
    premiumC: 680,
  },
  {
    id: 28,
    field01: '',
    field02: '암(4대유사암제외)특정치료비(호스피스완화의료치료)(암전문의료기관Ⅱ(상급종합병원등))(연간1회한)',
    insuredAmount: 2000,
    premium: 160,
    insuredAmountA: 2000,
    premiumA: 160,
    insuredAmountB: 2000,
    premiumB: 160,
    insuredAmountC: 2000,
    premiumC: 160,
  },
  {
    id: 29,
    field01: '168',
    field02: '4대유사암특정치료비(암전문의료기관Ⅱ(상급종합병원등))(각연간1회한)',
    insuredAmount: 1500,
    premium: 1547,
    insuredAmountA: 1500,
    premiumA: 1547,
    insuredAmountB: 1500,
    premiumB: 1547,
    insuredAmountC: 1500,
    premiumC: 1547,
  },
  {
    id: 30,
    field01: '',
    field02: '4대유사암특정치료비(수술)(암전문의료기관Ⅱ(상급종합병원등))(연간1회한)',
    insuredAmount: 400,
    premium: 1188,
    insuredAmountA: 400,
    premiumA: 1188,
    insuredAmountB: 400,
    premiumB: 1188,
    insuredAmountC: 400,
    premiumC: 1188,
  },
  {
    id: 31,
    field01: '',
    field02: '4대유사암특정치료비(항암방사선치료)(암전문의료기관Ⅱ(상급종합병원등))(연간1회한)',
    insuredAmount: 400,
    premium: 260,
    insuredAmountA: 400,
    premiumA: 260,
    insuredAmountB: 400,
    premiumB: 260,
    insuredAmountC: 400,
    premiumC: 260,
  },
  {
    id: 32,
    field01: '',
    field02: '4대유사암특정치료비(항암약물치료)(암전문의료기관Ⅱ(상급종합병원등))(연간1회한)',
    insuredAmount: 400,
    premium: 96,
    insuredAmountA: 400,
    premiumA: 96,
    insuredAmountB: 400,
    premiumB: 96,
    insuredAmountC: 400,
    premiumC: 96,
  },
  {
    id: 33,
    field01: '',
    field02: '4대유사암특정치료비(중환자실치료)(암전문의료기관Ⅱ(상급종합병원등))(연간1회한)',
    insuredAmount: 300,
    premium: 3,
    insuredAmountA: 300,
    premiumA: 3,
    insuredAmountB: 300,
    premiumB: 3,
    insuredAmountC: 300,
    premiumC: 3,
  },
  {
    id: 34,
    field01: '230',
    field02: '암(특정유사암포함)항암세기조절방사선치료비(1회한)',
    insuredAmount: 2000,
    premium: 2880,
    insuredAmountA: 2000,
    premiumA: 2880,
    insuredAmountB: 2000,
    premiumB: 2880,
    insuredAmountC: 0,
    premiumC: 0,
  },
  {
    id: 35,
    field01: '232',
    field02: '암(특정유사암포함)항암양성자방사선치료비(1회한)',
    insuredAmount: 3000,
    premium: 960,
    insuredAmountA: 0,
    premiumA: 0,
    insuredAmountB: 0,
    premiumB: 0,
    insuredAmountC: 0,
    premiumC: 0,
  },
  {
    id: 36,
    field01: '234',
    field02: '암(특정유사암포함)항암중입자방사선치료비(1회한)',
    insuredAmount: 5000,
    premium: 1750,
    insuredAmountA: 0,
    premiumA: 0,
    insuredAmountB: 0,
    premiumB: 0,
    insuredAmountC: 0,
    premiumC: 0,
  },
  {
    id: 37,
    field01: '238',
    field02: '암(특정유사암포함)표적항암약물허가치료비(1회한)',
    insuredAmount: 2000,
    premium: 5120,
    insuredAmountA: 0,
    premiumA: 0,
    insuredAmountB: 0,
    premiumB: 0,
    insuredAmountC: 0,
    premiumC: 0,
  },
  {
    id: 38,
    field01: '240',
    field02: '카티(CAR-T)항암약물허가치료비(1회한)',
    insuredAmount: 5000,
    premium: 120,
    insuredAmountA: 0,
    premiumA: 0,
    insuredAmountB: 0,
    premiumB: 0,
    insuredAmountC: 0,
    premiumC: 0,
  },
  {
    id: 39,
    field01: '242',
    field02: '암(4대유사암제외)특정항암호르몬약물허가치료비(연간1회한)',
    insuredAmount: 300,
    premium: 894,
    insuredAmountA: 0,
    premiumA: 0,
    insuredAmountB: 0,
    premiumB: 0,
    insuredAmountC: 0,
    premiumC: 0,
  },
  {
    id: 40,
    field01: '278',
    field02: '뇌혈관질환진단비',
    insuredAmount: 1000,
    premium: 7860,
    insuredAmountA: 1000,
    premiumA: 7860,
    insuredAmountB: 1000,
    premiumB: 7860,
    insuredAmountC: 1000,
    premiumC: 7860,
  },
  {
    id: 41,
    field01: '282',
    field02: '뇌졸중진단비',
    insuredAmount: 1000,
    premium: 3740,
    insuredAmountA: 1000,
    premiumA: 3740,
    insuredAmountB: 1000,
    premiumB: 3740,
    insuredAmountC: 1000,
    premiumC: 3740,
  },
  {
    id: 42,
    field01: '286',
    field02: '뇌출혈진단비',
    insuredAmount: 1500,
    premium: 1590,
    insuredAmountA: 1500,
    premiumA: 1590,
    insuredAmountB: 1500,
    premiumB: 1590,
    insuredAmountC: 1500,
    premiumC: 1590,
  },
  {
    id: 43,
    field01: '287',
    field02: '뇌전증진단비',
    insuredAmount: 1000,
    premium: 1960,
    insuredAmountA: 1000,
    premiumA: 1960,
    insuredAmountB: 1000,
    premiumB: 1960,
    insuredAmountC: 1000,
    premiumC: 1960,
  },
  {
    id: 44,
    field01: '300',
    field02: '허혈성심장질환진단비',
    insuredAmount: 1000,
    premium: 2460,
    insuredAmountA: 1000,
    premiumA: 2460,
    insuredAmountB: 1000,
    premiumB: 2460,
    insuredAmountC: 1000,
    premiumC: 2460,
  },
  {
    id: 45,
    field01: '307',
    field02: '급성심근경색증진단비',
    insuredAmount: 1000,
    premium: 600,
    insuredAmountA: 1000,
    premiumA: 600,
    insuredAmountB: 1000,
    premiumB: 600,
    insuredAmountC: 1000,
    premiumC: 600,
  },
  {
    id: 46,
    field01: '311',
    field02: '심근병증진단비',
    insuredAmount: 1000,
    premium: 1210,
    insuredAmountA: 1000,
    premiumA: 1210,
    insuredAmountB: 1000,
    premiumB: 1210,
    insuredAmountC: 1000,
    premiumC: 1210,
  },
  {
    id: 47,
    field01: '312',
    field02: '심장판막협착증(대동맥판막)진단비',
    insuredAmount: 100,
    premium: 69,
    insuredAmountA: 100,
    premiumA: 69,
    insuredAmountB: 100,
    premiumB: 69,
    insuredAmountC: 100,
    premiumC: 69,
  },
  {
    id: 48,
    field01: '596',
    field02: '암(4대유사암제외)수술비Ⅱ(수술1회당)',
    insuredAmount: 500,
    premium: 4750,
    insuredAmountA: 500,
    premiumA: 4750,
    insuredAmountB: 500,
    premiumB: 4750,
    insuredAmountC: 500,
    premiumC: 4750,
  },
  {
    id: 49,
    field01: '597',
    field02: '4대유사암수술비Ⅱ(수술1회당)',
    insuredAmount: 100,
    premium: 530,
    insuredAmountA: 100,
    premiumA: 530,
    insuredAmountB: 100,
    premiumB: 530,
    insuredAmountC: 100,
    premiumC: 530,
  },
  {
    id: 50,
    field01: '605',
    field02: '뇌혈관질환수술비(1회한)',
    insuredAmount: 1000,
    premium: 2700,
    insuredAmountA: 1000,
    premiumA: 2700,
    insuredAmountB: 1000,
    premiumB: 2700,
    insuredAmountC: 1000,
    premiumC: 2700,
  },
  {
    id: 51,
    field01: '607',
    field02: '뇌졸중수술비(1회한)',
    insuredAmount: 1000,
    premium: 1700,
    insuredAmountA: 1000,
    premiumA: 1700,
    insuredAmountB: 1000,
    premiumB: 1700,
    insuredAmountC: 1000,
    premiumC: 1700,
  },
  {
    id: 52,
    field01: '610',
    field02: '허혈성심장질환수술비(1회한)',
    insuredAmount: 1000,
    premium: 2800,
    insuredAmountA: 1000,
    premiumA: 2800,
    insuredAmountB: 1000,
    premiumB: 2800,
    insuredAmountC: 1000,
    premiumC: 2800,
  },
  {
    id: 53,
    field01: '612',
    field02: '급성심근경색증수술비(1회한)',
    insuredAmount: 1000,
    premium: 600,
    insuredAmountA: 1000,
    premiumA: 600,
    insuredAmountB: 1000,
    premiumB: 600,
    insuredAmountC: 1000,
    premiumC: 600,
  },
  {
    id: 54,
    field01: '621',
    field02: '상해중환자실입원비(1일이상10일한도)',
    insuredAmount: 20,
    premium: 800,
    insuredAmountA: 20,
    premiumA: 800,
    insuredAmountB: 20,
    premiumB: 800,
    insuredAmountC: 20,
    premiumC: 800,
  },
  {
    id: 55,
    field01: '631',
    field02: '질병중환자실입원비(1일이상10일한도)',
    insuredAmount: 20,
    premium: 540,
    insuredAmountA: 20,
    premiumA: 540,
    insuredAmountB: 20,
    premiumB: 540,
    insuredAmountC: 20,
    premiumC: 540,
  },
  {
    id: 56,
    field01: '175',
    field02: '비급여(전액본인부담금포함)암특정주요치료비(각연간1회한)',
    insuredAmount: 0,
    premium: 0,
    insuredAmountA: 1000,
    premiumA: 8890,
    insuredAmountB: 0,
    premiumB: 0,
    insuredAmountC: 1000,
    premiumC: 8890,
  },
];

/**
 * 비교할 제안 플랜 키 ('A' | 'B' | 'C')
 */
type PlanKey = 'A' | 'B' | 'C';

/**
 * 각 플랜의 가입금액 및 보험료가 매핑되는 속성 명칭 정의
 */
const PLAN_COLS: Array<{
  key: PlanKey;
  leftField: keyof DummyDataType;
  rightField: keyof DummyDataType;
  resolution: string[];
}> = [
  {
    key: 'A',
    leftField: 'insuredAmountA',
    rightField: 'premiumA',
    resolution: ['인수금지', '인수기준', '당사누적', '업계누적'],
  },
  {
    key: 'B',
    leftField: 'insuredAmountB',
    rightField: 'premiumB',
    resolution: ['인수금지', '인수기준', '당사누적'],
  },
  {
    key: 'C',
    leftField: 'insuredAmountC',
    rightField: 'premiumC',
    resolution: ['인수금지', '업계누적'],
  },
];

/**
 * @component Ltpz068
 * @description AI인수지침 위배해소 결과 확인 및 적용 다이얼로그 컴포넌트
 * - 인수 지침 심사에서 위배 판정이 난 가입 담보 내역을 확인하고,
 * - AI가 추천하는 3가지 조정안(A안, B안, C안)을 병렬로 비교 분석하여 적절한 대안을 선택하여 일괄 적용하는 화면입니다.
 * - 주요 기능:
 *   1. 각 안의 금액이 현재 설계액보다 높거나(cell-greater) 낮을(cell-less) 경우 셀 배경 스타일을 동적으로 변경
 *   2. 상단 탭을 Ag-Grid 레이아웃 바로 위쪽에 절대 좌표로 포지셔닝하여 각 안의 열(Column)들과 물리적 열 너비를 시각적으로 일치시킴
 *   3. 탭 클릭 시 선택한 플랜을 활성화(`selectedPlan`)하고 하단 합계행(`sumRow`)과 연계 계산
 */

const Ltpz068 = () => {
  // 담보 목록 로우 데이터
  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  // 현재 체크(선택)된 추천 해소안 플랜 상태
  const [selectedPlan, setSelectedPlan] = React.useState<PlanKey>('A');

  /**
   * 문자열 및 숫자 형태의 금액 데이터를 안전하게 실수형 숫자로 변환하는 헬퍼 함수
   */
  const toNumber = React.useCallback((value: string | number): number => {
    if (typeof value === 'number') {
      return Number.isFinite(value) ? value : 0;
    }

    const normalized = value.replaceAll(',', '').trim();
    if (normalized.length === 0) {
      return 0;
    }

    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : 0;
  }, []);

  /**
   * 현재 설계 및 각 제안 플랜(A, B, C안)별 보장보험료 합계 계산
   */
  const premiumTotals = React.useMemo(() => {
    return rowData.reduce(
      (acc, row) => {
        acc.current += toNumber(row.premium);
        acc.A += toNumber(row.premiumA);
        acc.B += toNumber(row.premiumB);
        acc.C += toNumber(row.premiumC);
        return acc;
      },
      { current: 0, A: 0, B: 0, C: 0 }
    );
  }, [rowData, toNumber]);

  const { attributeColumnWidth } = useDynamicColumnWidths();

  // 그리드 컬럼 설정 (현재 설계 정보 및 A/B/C안의 가입조건 금액 비교)
  const columnDefs = React.useMemo<ColDef<DummyDataType>[]>(() => {
    return [
      {
        headerName: '순번',
        field: 'field01',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center px-0!',
      },
      {
        headerName: '담보명',
        field: 'field02',
        flex: 10,
        cellClass: 'text-left ',
        tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field02' }),
      },
      {
        headerName: '가입금액(만원)',
        headerComponent: HeaderWithUnit,
        headerComponentParams: {
          label: '가입금액',
          unit: '(만원)',
        },
        field: 'insuredAmount',
        width: attributeColumnWidth(92),
        cellClass: 'text-right',
        valueFormatter: numberValueFormatter<DummyDataType>,
      },
      {
        headerName: '보험료(원)',
        headerComponent: HeaderWithUnit,
        headerComponentParams: {
          label: '보험료',
          unit: '(원)',
        },
        field: 'premium',
        width: attributeColumnWidth(92),
        cellClass: 'text-right',
        valueFormatter: numberValueFormatter<DummyDataType>,
      },
      // flatMap을 이용하여 A안, B안, C안의 가입금액 및 보험료 컬럼을 동적으로 이어붙임
      ...PLAN_COLS.flatMap(({ leftField, rightField }): ColDef<DummyDataType>[] => [
        {
          headerName: '가입금액(만원)',
          headerComponent: HeaderWithUnit,
          headerComponentParams: {
            label: '가입금액',
            unit: '(만원)',
          },
          field: leftField,
          width: attributeColumnWidth(92),
          cellClass: 'text-right pr-2!',
          valueFormatter: numberValueFormatter<DummyDataType>,
          cellClassRules: {
            // 현재설계 가입금액 기준보다 제안액이 큰 경우 빨간색/주황색 하이라이트 클래스 부여
            'cell-greater': (params) => {
              if (params.node.isRowPinned()) return false;
              const base = toNumber(params.data?.insuredAmount ?? 0);
              const current = toNumber(params.value ?? 0);
              return current > base;
            },
            // 현재설계 가입금액 기준보다 제안액이 작은 경우 파란색 하이라이트 클래스 부여
            'cell-less': (params) => {
              if (params.node.isRowPinned()) return false;
              const base = toNumber(params.data?.insuredAmount ?? 0);
              const current = toNumber(params.value ?? 0);
              return current < base;
            },
          },
        },
        {
          headerName: '보험료(원)',
          headerComponent: HeaderWithUnit,
          headerComponentParams: {
            label: '보험료',
            unit: '(원)',
          },
          field: rightField,
          width: attributeColumnWidth(92),
          cellClass: 'text-right pr-2!',
          valueFormatter: numberValueFormatter<DummyDataType>,
          cellClassRules: {
            // 현재설계 보험료 기준보다 제안액이 큰 경우
            'cell-greater': (params) => {
              if (params.node.isRowPinned()) return false;
              const base = toNumber(params.data?.premium ?? 0);
              const current = toNumber(params.value ?? 0);
              return current > base;
            },
            // 현재설계 보험료 기준보다 제안액이 작은 경우
            'cell-less': (params) => {
              if (params.node.isRowPinned()) return false;
              const base = toNumber(params.data?.premium ?? 0);
              const current = toNumber(params.value ?? 0);
              return current < base;
            },
          },
        },
      ]),
    ];
  }, [numberValueFormatter, attributeColumnWidth, toNumber]);

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="2xl" className="min-h-[90vh]">
        {/* 다이얼로그 상단 타이틀 */}
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              AI인수지침 위배해소 결과 확인 및 적용
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ068)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        {/* 다이얼로그 본문 섹션 */}
        <DialogSection className="grid-rows-[auto_1fr] gap-0">
          {/* 상단 AI 해결안 가이드 멘트 */}
          <Gcol className="w-full h-[16.8rem] pointer-events-none pb-[2rem]" gap={2} placement="cs">
            <Gcol className="gap-[0.2rem]" placement="cs">
              <Ai2Icon />
              <Typo variant={'body-xl'} className="font-bold">
                <b className="text-[var(--color-information-50)]">AI의 해결안을 적용</b>하면 <br />
                인수지침 위배 항목이 <b className="text-[var(--color-information-50)]">자동 해소</b>됩니다.
              </Typo>
            </Gcol>
            <Typo variant={'body-sm'} color={'gray'}>
              본 사안은 AI가 제시한 인수 지침 해소 방안으로
              <br />
              개발 사안의 특성에 따라 일부를 해소하지 못할 수 있습니다.
            </Typo>
          </Gcol>

          <div className="relative">
            <Grid className="w-[calc(18.4rem*4)] grid-cols-[1fr_1fr_1fr_1fr] h-[calc(100%+16.8rem)] absolute top-[-16.8rem] right-[1.5rem] items-start gap-0 z-100 pointer-events-none ">
              {/* 현재 설계 고정 영역 */}
              <div className="h-full w-full rounded-[1rem_0]">
                <Grid className="grid-rows-[auto_1frm] w-full rounded-[1rem_1rem_0_0] h-[16.8rem] border border-[var(--color-gray-15)] bg-[var(--color-gray-5)]">
                  <Grow placement="bwc" className="w-full h-[4rem] px-4 py-2">
                    <Typo variant={'heading-lg'}>현재</Typo>
                  </Grow>
                  <Gcol className="px-4" placement="es">
                    <Grow
                      className="w-full pt-[0.5rem] pb-[0.8rem] border-t-[1px] border-t-[var(--color-gray-20)]"
                      placement="bwc"
                    >
                      <Typo tag="b" variant={'body-sm'} color={'gray'}>
                        보장보험료(합)
                      </Typo>
                      <Typo tag="b" variant={'body-lg'} color={'gray'}>
                        {premiumTotals.current.toLocaleString()}원
                      </Typo>
                    </Grow>
                  </Gcol>
                </Grid>
              </div>
              {/* AI 제안 플랜 A안, B안, C안 선택 탭 */}
              {PLAN_COLS.map(({ key: plan, resolution: res }) => {
                const isActive = selectedPlan === plan;

                return (
                  <Grid
                    key={plan}
                    className={cn(
                      'grid-rows-[auto_1frm] w-full rounded-[1rem_1rem_0_0] h-full',
                      isActive && 'border border-[var(--color-primary-50)] border-[0.2rem] overflow-hidden '
                    )}
                  >
                    <Grid
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelectedPlan(plan)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedPlan(plan);
                        }
                      }}
                      aria-pressed={isActive}
                      className={cn(
                        'grid-rows-[auto_1frm] w-full overflow-hidden pointer-events-auto cursor-pointer',
                        isActive
                          ? 'h-[16.5rem]'
                          : 'rounded-[1rem_1rem_0_0] border border-[var(--color-gray-15)] h-[16.7rem]'
                      )}
                    >
                      <Grow
                        placement="bwc"
                        className={cn('w-full h-[4rem] px-4 py-2', isActive ? 'bg-[var(--color-primary-50)]' : '')}
                        gap={0}
                      >
                        <b className={cn(isActive && 'text-[#fff]')}>{plan}안</b>
                        <RadioGroup
                          value={isActive ? plan : ''}
                          onValueChange={() => setSelectedPlan(plan)}
                          onClick={(e: React.MouseEvent) => e.stopPropagation()}
                          variant="default"
                        >
                          <RadioGroupItem id={`plan-${plan}`} size="lg" value={plan} />
                        </RadioGroup>
                      </Grow>
                      <Gcol className={cn(isActive ? 'px-[1rem]' : 'px-3')} placement="es" gap={2.5}>
                        <Gcol placement="ss" gap={2}>
                          <Typo variant={'body-sm'} weight={'bold'}>
                            해소범위
                          </Typo>
                          <Grid className="grid-cols-[1fr_1fr] grid-rows-[1fr_1fr] w-full gap-1">
                            {res.map((v) => {
                              const badgeColor = v === '당사누적' ? 'green' : v === '업계누적' ? 'blue' : 'orange';
                              return (
                                <Badge
                                  variant={'rounded'}
                                  key={v}
                                  color={badgeColor}
                                  className="h-[2.2rem] w-full font-normal font-bold"
                                >
                                  <CheckIcon />
                                  {v}
                                </Badge>
                              );
                            })}
                          </Grid>
                        </Gcol>
                        <Grow
                          className="w-full pt-[0.5rem] pb-[0.8rem] border-t-[1px] border-t-[var(--color-gray-20)]"
                          placement="bwc"
                        >
                          <Typo tag="b" variant={'body-sm'} color={'gray'}>
                            보장보험료(합)
                          </Typo>
                          <Typo tag="b" variant={'body-lg'} color={'gray'}>
                            {premiumTotals[plan].toLocaleString()}원
                          </Typo>
                        </Grow>
                      </Gcol>
                    </Grid>
                    <div></div>
                  </Grid>
                );
              })}
            </Grid>
            {/* 가입 설계 금액 대조용 Ag-Grid 본체 */}
            <div className="ag-theme-alpine relative">
              <AgGridReact<DummyDataType>
                getRowId={(params) => String(params.data.id)}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={{
                  sortable: true,
                  resizable: false,
                  cellDataType: false,
                }}
                alwaysShowVerticalScroll={true}
                enableCellSpan={true}
                domLayout="normal"
                tooltipShowMode="standard"
                tooltipShowDelay={0}
                getRowStyle={(params) => (params.node.rowPinned ? { fontWeight: 'bold' } : undefined)}
              />
            </div>
          </div>
        </DialogSection>

        {/* 다이얼로그 하단 푸터 버튼 */}
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                적용
              </Button>
              <DialogClose asChild>
                <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                  닫기
                </Button>
              </DialogClose>
            </Grow>
          </DialogFooterArea>
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz068;
