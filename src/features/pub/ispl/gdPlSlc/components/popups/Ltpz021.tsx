/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

/**
 * @file Ltpz021.tsx
 * @description 한화손해보험 장기보험 추천설계비교 다이얼로그 팝업 컴포넌트입니다.
 *
 */

import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import React from 'react';
import { AgGridEmptyComponent, createTooltipValueGetter, useDynamicColumnWidths, numberValueFormatter } from '@aggrid';
import { Gcol, Grow, Typo, Grid } from '@atoms';

import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
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
import { Input } from '@uiux/Input';

import '@/shared/lib/agGridPub';

const coverageDummyList = [
  { id: 1, field1: '보통약관(상해사망)', field2: '5000', field3: '700' },
  { id: 2, field1: '보험료납입면제대상보장(6대사유Ⅱ)', field2: '10', field3: '154' },
  { id: 3, field1: '보장보험료50%납입지원Ⅱ(4대유사암)', field2: '5', field3: '2769' },
  { id: 4, field1: '4대유사암진단비', field2: '2400', field3: '3132' },
  { id: 5, field1: '4대유사암진단비(기타피부암)', field2: '600', field3: '240' },
  { id: 6, field1: '4대유사암진단비(제자리암)', field2: '600', field3: '1248' },
  { id: 7, field1: '4대유사암진단비(경계성종양)', field2: '600', field3: '228' },
  { id: 8, field1: '4대유사암진단비(갑상선암)', field2: '600', field3: '1416' },
  { id: 9, field1: '여성통합암(4대유사암제외)진단비Ⅱ', field2: '39000', field3: '31440' },
  { id: 10, field1: '여성통합암(4대유사암제외)진단비Ⅱ(대장암)', field2: '3000', field3: '4200' },
  { id: 11, field1: '여성통합암(4대유사암제외)진단비Ⅱ(특정소화기관암)', field2: '3000', field3: '7050' },
  { id: 12, field1: '여성통합암(4대유사암제외)진단비Ⅱ(유방암)', field2: '3000', field3: '8700' },
  { id: 13, field1: '여성통합암(4대유사암제외)진단비Ⅱ(자궁관련암)', field2: '3000', field3: '2400' },
  { id: 14, field1: '여성통합암(4대유사암제외)진단비Ⅱ(난소암)', field2: '3000', field3: '900' },
  { id: 15, field1: '여성통합암(4대유사암제외)진단비Ⅱ(특정여성생식기관암)', field2: '3000', field3: '120' },
  { id: 16, field1: '여성통합암(4대유사암제외)진단비Ⅱ(비뇨기관암(요로암))', field2: '3000', field3: '1050' },
  { id: 17, field1: '여성통합암(4대유사암제외)진단비Ⅱ(폐암)', field2: '3000', field3: '3060' },
  { id: 18, field1: '여성통합암(4대유사암제외)진단비Ⅱ(특정호흡기및흉곽내기관암)', field2: '3000', field3: '270' },
  { id: 19, field1: '여성통합암(4대유사암제외)진단비Ⅱ(눈,뇌,중추신경계통및내분비선암)', field2: '3000', field3: '330' },
  { id: 20, field1: '여성통합암(4대유사암제외)진단비Ⅱ(입술,구강및인두암)', field2: '3000', field3: '390' },
  {
    id: 21,
    field1: '여성통합암(4대유사암제외)진단비Ⅱ(뼈,관절,악성흑색종,중피성및연조직암)',
    field2: '3000',
    field3: '510',
  },
  { id: 22, field1: '여성통합암(4대유사암제외)진단비Ⅱ(림프및조혈관련특정암)', field2: '3000', field3: '2460' },
  {
    id: 23,
    field1: '암(4대유사암제외)특정치료비(암전문의료기관Ⅱ(상급종합병원등))(각연간1회한)',
    field2: '9000',
    field3: '36000',
  },
  {
    id: 24,
    field1: '암(4대유사암제외)특정치료비(수술)(암전문의료기관Ⅱ(상급종합병원등))(연간1회한)',
    field2: '2000',
    field3: '12040',
  },
  {
    id: 25,
    field1: '암(4대유사암제외)특정치료비(항암방사선치료)(암전문의료기관Ⅱ(상급종합병원등))(연간1회한)',
    field2: '2000',
    field3: '8140',
  },
  {
    id: 26,
    field1: '암(4대유사암제외)특정치료비(항암약물치료)(암전문의료기관Ⅱ(상급종합병원등))(연간1회한)',
    field2: '2000',
    field3: '14980',
  },
  {
    id: 27,
    field1: '암(4대유사암제외)특정치료비(중환자실치료)(암전문의료기관Ⅱ(상급종합병원등))(연간1회한)',
    field2: '1000',
    field3: '680',
  },
  {
    id: 28,
    field1: '암(4대유사암제외)특정치료비(호스피스완화의료치료)(암전문의료기관Ⅱ(상급종합병원등))(연간1회한)',
    field2: '2000',
    field3: '160',
  },
  {
    id: 29,
    field1: '4대유사암특정치료비(암전문의료기관Ⅱ(상급종합병원등))(각연간1회한)',
    field2: '1500',
    field3: '1547',
  },
  {
    id: 30,
    field1: '4대유사암특정치료비(수술)(암전문의료기관Ⅱ(상급종합병원등))(연간1회한)',
    field2: '400',
    field3: '1188',
  },
  {
    id: 31,
    field1: '4대유사암특정치료비(항암방사선치료)(암전문의료기관Ⅱ(상급종합병원등))(연간1회한)',
    field2: '400',
    field3: '260',
  },
  {
    id: 32,
    field1: '4대유사암특정치료비(항암약물치료)(암전문의료기관Ⅱ(상급종합병원등))(연간1회한)',
    field2: '400',
    field3: '96',
  },
  {
    id: 33,
    field1: '4대유사암특정치료비(중환자실치료)(암전문의료기관Ⅱ(상급종합병원등))(연간1회한)',
    field2: '300',
    field3: '3',
  },
  {
    id: 34,
    field1: '암(특정유사암포함)항암세기조절방사선치료비(1회한)',
    field2: '2000',
    field3: '2880',
  },
  {
    id: 35,
    field1: '암(특정유사암포함)항암양성자방사선치료비(1회한)',
    field2: '3000',
    field3: '960',
  },
  {
    id: 36,
    field1: '암(특정유사암포함)항암중입자방사선치료비(1회한)',
    field2: '5000',
    field3: '1750',
  },
  {
    id: 37,
    field1: '암(특정유사암포함)표적항암약물허가치료비(1회한)',
    field2: '2000',
    field3: '5120',
  },
  {
    id: 38,
    field1: '카티(CAR-T)항암약물허가치료비(1회한)',
    field2: '5000',
    field3: '120',
  },
  {
    id: 39,
    field1: '암(4대유사암제외)특정항암호르몬약물허가치료비(연간1회한)',
    field2: '300',
    field3: '894',
  },
  { id: 40, field1: '뇌혈관질환진단비', field2: '1000', field3: '7860' },
  { id: 41, field1: '뇌졸중진단비', field2: '1000', field3: '3740' },
  { id: 42, field1: '뇌출혈진단비', field2: '1500', field3: '1590' },
  { id: 43, field1: '뇌전증진단비', field2: '1000', field3: '1960' },
  { id: 44, field1: '허혈성심장질환진단비', field2: '1000', field3: '2460' },
  { id: 45, field1: '급성심근경색증진단비', field2: '1000', field3: '600' },
  { id: 46, field1: '심근병증진단비', field2: '1000', field3: '1210' },
  { id: 47, field1: '심장판막협착증(대동맥판막)진단비', field2: '100', field3: '69' },
  { id: 48, field1: '암(4대유사암제외)수술비Ⅱ(수술1회당)', field2: '500', field3: '4750' },
  { id: 49, field1: '4대유사암수술비Ⅱ(수술1회당)', field2: '100', field3: '530' },
  { id: 50, field1: '뇌혈관질환수술비(1회한)', field2: '1000', field3: '2700' },
  { id: 51, field1: '뇌졸중수술비(1회한)', field2: '1000', field3: '1700' },
  { id: 52, field1: '허혈성심장질환수술비(1회한)', field2: '1000', field3: '2800' },
  { id: 53, field1: '급성심근경색증수술비(1회한)', field2: '1000', field3: '600' },
  { id: 54, field1: '상해중환자실입원비(1일이상10일한도)', field2: '20', field3: '800' },
  { id: 55, field1: '질병중환자실입원비(1일이상10일한도)', field2: '20', field3: '540' },
  { id: 56, field1: '치료비 선지급서비스Ⅱ 특별약관', field2: '', field3: '' },
];

const coverageDummyList1 = [
  { id: 1, field1: '보통약관(상해사망)', field2: '5000', field3: '700' },
  { id: 2, field1: '보험료납입면제대상보장(6대사유Ⅱ)', field2: '10', field3: '151' },
  { id: 3, field1: '보장보험료50%납입지원Ⅱ(4대유사암)', field2: '5', field3: '2396' },
  { id: 4, field1: '4대유사암진단비', field2: '2100', field3: '2890' },
  { id: 5, field1: '4대유사암진단비(기타피부암)', field2: '500', field3: '190' },
  { id: 6, field1: '4대유사암진단비(제자리암)', field2: '500', field3: '1070' },
  { id: 7, field1: '4대유사암진단비(경계성종양)', field2: '500', field3: '190' },
  { id: 8, field1: '4대유사암진단비(갑상선암)', field2: '600', field3: '1440' },
  { id: 9, field1: '여성통합암(4대유사암제외)진단비Ⅱ', field2: '28000', field3: '21680' },
  { id: 10, field1: '여성통합암(4대유사암제외)진단비Ⅱ(대장암)', field2: '2000', field3: '2740' },
  { id: 11, field1: '여성통합암(4대유사암제외)진단비Ⅱ(특정소화기관암)', field2: '2000', field3: '4600' },
  { id: 12, field1: '여성통합암(4대유사암제외)진단비Ⅱ(유방암)', field2: '2000', field3: '5800' },
  { id: 13, field1: '여성통합암(4대유사암제외)진단비Ⅱ(자궁관련암)', field2: '2000', field3: '1600' },
  { id: 14, field1: '여성통합암(4대유사암제외)진단비Ⅱ(난소암)', field2: '2000', field3: '600' },
  { id: 15, field1: '여성통합암(4대유사암제외)진단비Ⅱ(특정여성생식기관암)', field2: '2000', field3: '80' },
  { id: 16, field1: '여성통합암(4대유사암제외)진단비Ⅱ(비뇨기관암(요로암))', field2: '2000', field3: '680' },
  { id: 17, field1: '여성통합암(4대유사암제외)진단비Ⅱ(폐암)', field2: '2000', field3: '1980' },
  { id: 18, field1: '여성통합암(4대유사암제외)진단비Ⅱ(특정호흡기및흉곽내기관암)', field2: '2000', field3: '180' },
  { id: 19, field1: '여성통합암(4대유사암제외)진단비Ⅱ(눈,뇌,중추신경계통및내분비선암)', field2: '2000', field3: '220' },
  { id: 20, field1: '여성통합암(4대유사암제외)진단비Ⅱ(입술,구강및인두암)', field2: '2000', field3: '260' },
  {
    id: 21,
    field1: '여성통합암(4대유사암제외)진단비Ⅱ(뼈,관절,악성흑색종,중피성및연조직암)',
    field2: '3000',
    field3: '510',
  },
  { id: 22, field1: '여성통합암(4대유사암제외)진단비Ⅱ(림프및조혈관련특정암)', field2: '3000', field3: '2430' },
  {
    id: 23,
    field1: '암(4대유사암제외)특정치료비(암전문의료기관Ⅱ(상급종합병원등))(각연간1회한)',
    field2: '9000',
    field3: '35710',
  },
  {
    id: 24,
    field1: '암(4대유사암제외)특정치료비(수술)(암전문의료기관Ⅱ(상급종합병원등))(연간1회한)',
    field2: '2000',
    field3: '11940',
  },
  {
    id: 25,
    field1: '암(4대유사암제외)특정치료비(항암방사선치료)(암전문의료기관Ⅱ(상급종합병원등))(연간1회한)',
    field2: '2000',
    field3: '8080',
  },
  {
    id: 26,
    field1: '암(4대유사암제외)특정치료비(항암약물치료)(암전문의료기관Ⅱ(상급종합병원등))(연간1회한)',
    field2: '2000',
    field3: '14860',
  },
  {
    id: 27,
    field1: '암(4대유사암제외)특정치료비(중환자실치료)(암전문의료기관Ⅱ(상급종합병원등))(연간1회한)',
    field2: '1000',
    field3: '670',
  },
  {
    id: 28,
    field1: '암(4대유사암제외)특정치료비(호스피스완화의료치료)(암전문의료기관Ⅱ(상급종합병원등))(연간1회한)',
    field2: '2000',
    field3: '160',
  },
  {
    id: 29,
    field1: '4대유사암특정치료비(암전문의료기관Ⅱ(상급종합병원등))(각연간1회한)',
    field2: '1500',
    field3: '1567',
  },
  {
    id: 30,
    field1: '4대유사암특정치료비(수술)(암전문의료기관Ⅱ(상급종합병원등))(연간1회한)',
    field2: '400',
    field3: '1204',
  },
  {
    id: 31,
    field1: '4대유사암특정치료비(항암방사선치료)(암전문의료기관Ⅱ(상급종합병원등))(연간1회한)',
    field2: '400',
    field3: '260',
  },
  {
    id: 32,
    field1: '4대유사암특정치료비(항암약물치료)(암전문의료기관Ⅱ(상급종합병원등))(연간1회한)',
    field2: '400',
    field3: '100',
  },
  {
    id: 33,
    field1: '4대유사암특정치료비(중환자실치료)(암전문의료기관Ⅱ(상급종합병원등))(연간1회한)',
    field2: '300',
    field3: '3',
  },
  {
    id: 34,
    field1: '암(특정유사암포함)항암세기조절방사선치료비(1회한)',
    field2: '2000',
    field3: '2860',
  },
  {
    id: 35,
    field1: '암(특정유사암포함)항암양성자방사선치료비(1회한)',
    field2: '3000',
    field3: '930',
  },
  {
    id: 36,
    field1: '암(특정유사암포함)항암중입자방사선치료비(1회한)',
    field2: '5000',
    field3: '1700',
  },
  {
    id: 37,
    field1: '암(특정유사암포함)표적항암약물허가치료비(1회한)',
    field2: '2000',
    field3: '5060',
  },
  {
    id: 38,
    field1: '카티(CAR-T)항암약물허가치료비(1회한)',
    field2: '5000',
    field3: '120',
  },
  {
    id: 39,
    field1: '암(4대유사암제외)특정항암호르몬약물허가치료비(연간1회한)',
    field2: '300',
    field3: '876',
  },
  { id: 40, field1: '뇌혈관질환진단비', field2: '1000', field3: '7620' },
  { id: 41, field1: '뇌졸중진단비', field2: '1000', field3: '3630' },
  { id: 42, field1: '뇌출혈진단비', field2: '1500', field3: '1545' },
  { id: 43, field1: '허혈성심장질환진단비', field2: '1000', field3: '2400' },
  { id: 44, field1: '암(4대유사암제외)수술비Ⅱ(수술1회당)', field2: '500', field3: '4700' },
  { id: 45, field1: '4대유사암수술비Ⅱ(수술1회당)', field2: '100', field3: '540' },
  { id: 46, field1: '뇌혈관질환수술비(1회한)', field2: '1000', field3: '2600' },
  { id: 47, field1: '허혈성심장질환수술비(1회한)', field2: '1000', field3: '2700' },
  { id: 48, field1: '상해중환자실입원비(1일이상10일한도)', field2: '20', field3: '800' },
  { id: 49, field1: '질병중환자실입원비(1일이상10일한도)', field2: '20', field3: '520' },
  { id: 50, field1: '치료비 선지급서비스Ⅱ 특별약관', field2: '', field3: '' },
];

const coverageDummyList2 = [
  { id: 1, field1: '보통약관(상해사망)', field2: '5000', field3: '600' },
  { id: 2, field1: '보험료납입면제대상보장(6대사유Ⅱ)', field2: '10', field3: '182' },
  { id: 3, field1: '보장보험료50%납입지원Ⅱ(4대유사암)', field2: '4', field3: '1844' },
  { id: 4, field1: '4대유사암진단비', field2: '2000', field3: '2420' },
  { id: 5, field1: '4대유사암진단비(기타피부암)', field2: '500', field3: '200' },
  { id: 6, field1: '4대유사암진단비(제자리암)', field2: '500', field3: '975' },
  { id: 7, field1: '4대유사암진단비(경계성종양)', field2: '500', field3: '190' },
  { id: 8, field1: '4대유사암진단비(갑상선암)', field2: '500', field3: '1055' },
  { id: 9, field1: '여성통합암(4대유사암제외)진단비Ⅱ', field2: '39000', field3: '31476' },
  { id: 10, field1: '여성통합암(4대유사암제외)진단비Ⅱ(대장암)', field2: '3000', field3: '4290' },
  { id: 11, field1: '여성통합암(4대유사암제외)진단비Ⅱ(특정소화기관암)', field2: '3000', field3: '7410' },
  { id: 12, field1: '여성통합암(4대유사암제외)진단비Ⅱ(유방암)', field2: '3000', field3: '7836' },
  { id: 13, field1: '여성통합암(4대유사암제외)진단비Ⅱ(자궁관련암)', field2: '3000', field3: '2424' },
  { id: 14, field1: '여성통합암(4대유사암제외)진단비Ⅱ(난소암)', field2: '3000', field3: '414' },
  { id: 15, field1: '여성통합암(4대유사암제외)진단비Ⅱ(특정여성생식기관암)', field2: '3000', field3: '906' },
  { id: 16, field1: '여성통합암(4대유사암제외)진단비Ⅱ(비뇨기관암(요로암))', field2: '3000', field3: '120' },
  { id: 17, field1: '여성통합암(4대유사암제외)진단비Ⅱ(폐암)', field2: '3000', field3: '1152' },
  { id: 18, field1: '여성통합암(4대유사암제외)진단비Ⅱ(특정호흡기및흉곽내기관암)', field2: '3000', field3: '3246' },
  { id: 19, field1: '여성통합암(4대유사암제외)진단비Ⅱ(눈,뇌,중추신경계통및내분비선암)', field2: '3000', field3: '324' },
  { id: 20, field1: '여성통합암(4대유사암제외)진단비Ⅱ(입술,구강및인두암)', field2: '3000', field3: '348' },
  {
    id: 21,
    field1: '여성통합암(4대유사암제외)진단비Ⅱ(뼈,관절,악성흑색종,중피성및연조직암)',
    field2: '3000',
    field3: '516',
  },
  { id: 22, field1: '여성통합암(4대유사암제외)진단비Ⅱ(림프및조혈관련특정암)', field2: '3000', field3: '2490' },
  {
    id: 23,
    field1: '암(특정유사암포함)항암세기조절방사선치료비(1회한)',
    field2: '1000',
    field3: '1430',
  },
  {
    id: 24,
    field1: '암(특정유사암포함)항암양성자방사선치료비(1회한)',
    field2: '3000',
    field3: '990',
  },
  {
    id: 25,
    field1: '암(특정유사암포함)항암중입자방사선치료비(1회한)',
    field2: '5000',
    field3: '1750',
  },
  {
    id: 26,
    field1: '암(특정유사암포함)표적항암약물허가치료비(1회한)',
    field2: '1000',
    field3: '2520',
  },
  {
    id: 27,
    field1: '카티(CAR-T)항암약물허가치료비(1회한)',
    field2: '5000',
    field3: '130',
  },
  {
    id: 28,
    field1: '암(4대유사암제외)특정항암호르몬약물허가치료비(연간1회한)',
    field2: '300',
    field3: '954',
  },
  { id: 29, field1: '뇌혈관질환진단비', field2: '2000', field3: '15680' },
  { id: 30, field1: '뇌졸중진단비', field2: '2000', field3: '7680' },
  { id: 31, field1: '뇌출혈진단비', field2: '1500', field3: '1605' },
  { id: 32, field1: '뇌전증진단비', field2: '1000', field3: '1990' },
  { id: 33, field1: '허혈성심장질환진단비', field2: '2000', field3: '5220' },
  { id: 34, field1: '급성심근경색증진단비', field2: '1000', field3: '680' },
  { id: 35, field1: '심근병증진단비', field2: '1000', field3: '1240' },
  { id: 36, field1: '심장판막협착증(대동맥판막)진단비', field2: '100', field3: '69' },
  { id: 37, field1: '암(4대유사암제외)수술비Ⅱ(수술1회당)', field2: '500', field3: '4800' },
  { id: 38, field1: '4대유사암수술비Ⅱ(수술1회당)', field2: '100', field3: '470' },
  { id: 39, field1: '뇌혈관질환수술비(1회한)', field2: '1000', field3: '2700' },
  { id: 40, field1: '허혈성심장질환수술비(1회한)', field2: '1000', field3: '2800' },
];

const productInfoList = [
  {
    name: '한화 시그니처 여성 건강보험4.0 2604',
    option: '100세만기 월납 / 20년납',
  },
  {
    name: '한화 시그니처 여성 건강보험4.0 2604',
    option: '100세만기 월납 / 20년납',
  },
  {
    name: '한화 더건강한 한아름종합보험 2604',
    option: '100세만기 월납 / 20년납',
  },
];

/**
 * 추천설계 비교 그리드 데이터 행(Row) 타입 정의
 */
type DummyDataType = {
  id: number;
  field1: string | number; // 담보명
  field2: string | number; // 가입금액
  field3: string | number; // 보험료
};
const DummyData: DummyDataType[] = coverageDummyList;
const DummyData1: DummyDataType[] = coverageDummyList1;
const DummyData2: DummyDataType[] = coverageDummyList2;

const Ltpz021 = () => {
  const { attributeColumnWidth } = useDynamicColumnWidths();

  const [rowData1] = React.useState<DummyDataType[]>(DummyData);
  const [rowData2] = React.useState<DummyDataType[]>(DummyData1);
  const [rowData3] = React.useState<DummyDataType[]>(DummyData2);
  const [checkedStates, setCheckedStates] = React.useState<boolean[]>([false, false, false]);

  // --- 그리드 공통 컬럼 정의 ---
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '담보명',
      field: 'field1',
      flex: 10,
      // 글자 크기나 컬럼 너비를 초과하여 말줄임(...) 처리되었을 때, 마우스 오버 시 풀네임 툴팁 표시
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field1' }),
    },
    {
      headerName: '가입금액(만원)',
      field: 'field2',
      flex: 1,
      minWidth: attributeColumnWidth(90), // 가로폭 동적 계산 적용
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter, // 금액 값에 천단위 콤마 포맷팅 적용
    },
    {
      headerName: '보험료(원)',
      field: 'field3',
      flex: 1,
      minWidth: attributeColumnWidth(80), // 가로폭 동적 계산 적용
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter, // 보험료 값에 천단위 콤마 포맷팅 적용
    },
  ];

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="2xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              추천설계비교
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ021)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr] h-full min-h-0 overflow-hidden min-w-[0]!">
          <Grow className="w-full" variant="box-round">
            <FormTable variant={'head'} lineTop={false}>
              <FormRow>
                <FormCell title={'피보험자'}>
                  <Input value={'김한화 41세(여)'} variant="info" readOnly />
                </FormCell>
                <FormCell title={'직업'}>
                  <Input value={'(1급)회사 사무직 종사자'} variant="info" readOnly />
                </FormCell>
                {/* <FormCell title={'보장분석'}>
                  <Input value={'2026-07-15 진행'} variant="info" readOnly />
                </FormCell>
                <FormCell title={'보험금지급 이력정보'}>
                  <Input value={'2026-07-15'} variant="info" readOnly />
                </FormCell> */}

                <FormCell title={'피보험자'}>
                  <Input value={'41세(1994-02-12) / 여 / 1급'} variant="info" readOnly />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <Grow gap={3} placement="ss" className="w-full h-full min-h-0 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <Grid
                className="grid-rows-[auto_1fr] w-full overflow-hidden border border-[#CBE3FF] rounded-[0.6rem] gap-5 h-full min-h-0 pb-[1rem]"
                key={i}
              >
                <Grow placement="bws" className="w-full bg-[#EFF8FF] p-[1rem] rounded-t-[0.6rem]">
                  <Gcol placement="ss">
                    <Typo tag={'strong'} variant={'body-lg'} weight={'bold'}>
                      {productInfoList[i].name}
                    </Typo>
                    <Typo tag={'p'} variant={'body-sm'} color={'gray'}>
                      {productInfoList[i].option}
                    </Typo>
                  </Gcol>
                  <Grow>
                    <Checkbox
                      color="info"
                      checked={checkedStates[i]}
                      onCheckedChange={(checked) => {
                        setCheckedStates((prev) => {
                          const next = [...prev];
                          next[i] = !!checked;
                          return next;
                        });
                      }}
                      size="lg"
                      variant="default"
                    ></Checkbox>
                  </Grow>
                </Grow>
                <Gcol className="w-full h-full min-h-0 overflow-hidden px-[1rem] pb-[3rem]" placement="ss" gap={0}>
                  <div className="ag-theme-alpine w-full inner-scroll" data-rows={rowData1.length}>
                    <AgGridReact<DummyDataType>
                      getRowId={(params) => String(params.data.id)}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      // 루프 인덱스(i)에 맞춰 각각 독립적인 비교용 로우 데이터 바인딩
                      rowData={i === 0 ? rowData1 : i === 1 ? rowData2 : rowData3}
                      columnDefs={columnDefs}
                      defaultColDef={{
                        suppressMovable: true, // 사용자의 임의 컬럼 드래그 이동 비활성화
                        sortable: false, // 추천설계비교 화면에서는 정렬 비활성화 (3개 그리드 순서가 어긋날 수 있음)
                        resizable: true, // 컬럼 크기 조절 허용
                      }}
                      tooltipShowMode="whenTruncated" // 컬럼 너비 초과 시에만 툴팁 노출
                      tooltipShowDelay={0}
                      animateRows={false}
                    />
                  </div>

                  {/* 예상보험료 요약 영역 */}
                  <Grow
                    className="flex h-[3rem] w-full border-t !border-t-[var(--color-primary-50)] bg-[var(--color-primary-10)] border-t-[0.1rem] border-b border-b-[var(--color-gray-15)] px-[0.6rem] text-[1.3rem] class-expected-premium-bar"
                    placement="bwc"
                  >
                    <Typo tag={'span'} variant={'body-md'} weight={'bold'} className="text-[var(--color-primary-50)]">
                      예상보험료
                    </Typo>
                    <Typo tag={'span'} variant={'body-md'} weight={'bold'} className="text-[var(--color-primary-50)]">
                      {i === 0 ? '121,375' : i === 1 ? '103,695' : '89,230'}
                    </Typo>
                  </Grow>
                </Gcol>
              </Grid>
            ))}
          </Grow>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button
                variant={'contained'}
                size={'xl'}
                color={'primary'}
                disabled={checkedStates.filter(Boolean).length === 0}
              >
                설계생성({checkedStates.filter(Boolean).length})
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

export default Ltpz021;
