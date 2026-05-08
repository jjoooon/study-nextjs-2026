/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

'use client';

import { Gcol, Grow, Typo, Grid } from '@atoms';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { SearchIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Checkbox, CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import * as React from 'react';
import '@/shared/lib/agGridPub';
import { BulletListItem } from '@/shared/components/common/BulletList';

const Ltpz01502 = () => {
  return (
    <Grid className="w-full grid-rows-[auto_1fr] h-full" gap={3}>
      <Grow className="w-full" variant="box-round">
        <FormTable variant={'head'} lineTop={false} caption="">
          <FormRow>
            <FormCell title={'취급자(전화번호)'}>
              <Input width={120} value={''} required />
              <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                <SearchIcon color={'var(--color-primary-50)'} />
              </Button>
              <Input width={200} value={''} readOnly />
              <Grow>
                (
                <Input width={40} value={''} readOnly />-
                <Input width={40} value={''} readOnly />-
                <Input width={40} value={''} readOnly />)
              </Grow>
            </FormCell>
          </FormRow>
        </FormTable>
      </Grow>
      <TableFold variant="accordion">
        <TableFoldHead title="가입설계 동의(LMS)">
          <Grow>
            <Button variant={'outlined'} color={'secondary'} onClick={() => {}}>
              초기화
            </Button>
          </Grow>
        </TableFoldHead>
        <TableFoldBody className="gap-3">
          <FormTable caption="가입설계 동의" cols={['w-[12rem]', 'flex-1']}>
            <FormRow>
              <FormCell title={'고객명'}>
                <Grow placement="bwc">
                  <Grow>
                    <Input width={108} value={''} required />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                  </Grow>
                  <Checkbox onCheckedChange={() => {}} size="lg">
                    피성년후견인
                  </Checkbox>
                </Grow>
              </FormCell>
            </FormRow>
            <FormRow>
              <FormCell title={'고객 생년월일'}>
                <Input width={108} value={''} placeholder="______-_" required />
                <Typo>예시)750102-1</Typo>
              </FormCell>
            </FormRow>
          </FormTable>
          <FormTable caption="가입설계 동의" cols={['w-[12rem]', 'flex-1']}>
            <FormRow>
              <FormCell title={'고객 휴대폰번호'}>
                <NativeSelect aria-label="항목 선택" width={108} value={''} required>
                  {[
                    { value: 'selection1', id: 'type01-1', label: '선택' },
                    { value: 'selection2', id: 'type01-2', label: 'SK' },
                    { value: 'selection3', id: 'type01-3', label: 'KT' },
                    { value: 'selection4', id: 'type01-4', label: 'LG' },
                    { value: 'selection5', id: 'type01-5', label: 'SK 알뜰폰' },
                    { value: 'selection6', id: 'type01-6', label: 'KT 알뜰폰' },
                    { value: 'selection7', id: 'type01-7', label: 'LG 알뜰폰' },
                  ].map((option) => (
                    <NativeSelectOption key={option.id} value={option.value}>
                      {option.label}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
                <Input width={108} value={''} placeholder="___-____-____" required />
                <Button variant={'outlined'} size={'lg'} color={'secondary'} onClick={() => {}}>
                  인증요청
                </Button>
              </FormCell>
            </FormRow>
            <FormRow>
              <FormCell title={'후견인명'}>
                <Grow placement="bwc">
                  <Grow>
                    <Input width={108} value={''} required />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                  </Grow>
                </Grow>
              </FormCell>
            </FormRow>
            <FormRow>
              <FormCell title={'후견인 생년월일'}>
                <Input width={108} value={''} placeholder="______-_" required />
                <Typo>예시)750102-1</Typo>
              </FormCell>
            </FormRow>
            <FormRow>
              <FormCell title={'후견인 휴대폰번호'}>
                <NativeSelect aria-label="항목 선택" width={108} value={''} required>
                  {[
                    { value: 'selection1', id: 'type01-1', label: '선택' },
                    { value: 'selection2', id: 'type01-2', label: 'SK' },
                    { value: 'selection3', id: 'type01-3', label: 'KT' },
                    { value: 'selection4', id: 'type01-4', label: 'LG' },
                    { value: 'selection5', id: 'type01-5', label: 'SK 알뜰폰' },
                    { value: 'selection6', id: 'type01-6', label: 'KT 알뜰폰' },
                    { value: 'selection7', id: 'type01-7', label: 'LG 알뜰폰' },
                  ].map((option) => (
                    <NativeSelectOption key={option.id} value={option.value}>
                      {option.label}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
                <Input width={108} value={''} placeholder="___-____-____" required />
                <Button variant={'outlined'} size={'lg'} color={'secondary'} onClick={() => {}}>
                  인증요청
                </Button>
              </FormCell>
            </FormRow>
            <FormRow>
              <FormCell title={'친권자명'}>
                <Grow placement="bwc">
                  <Grow>
                    <Input width={108} value={''} required />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                  </Grow>
                </Grow>
              </FormCell>
            </FormRow>
            <FormRow>
              <FormCell title={'친권자 생년월일'}>
                <Input width={108} value={''} placeholder="______-_" required />
                <Typo>예시)750102-1</Typo>
              </FormCell>
            </FormRow>
            <FormRow>
              <FormCell title={'친권자 휴대폰번호'}>
                <NativeSelect aria-label="항목 선택" width={108} value={''} required>
                  {[
                    { value: 'selection1', id: 'type01-1', label: '선택' },
                    { value: 'selection2', id: 'type01-2', label: 'SK' },
                    { value: 'selection3', id: 'type01-3', label: 'KT' },
                    { value: 'selection4', id: 'type01-4', label: 'LG' },
                    { value: 'selection5', id: 'type01-5', label: 'SK 알뜰폰' },
                    { value: 'selection6', id: 'type01-6', label: 'KT 알뜰폰' },
                    { value: 'selection7', id: 'type01-7', label: 'LG 알뜰폰' },
                  ].map((option) => (
                    <NativeSelectOption key={option.id} value={option.value}>
                      {option.label}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
                <Input width={108} value={''} placeholder="___-____-____" required />
                <Button variant={'outlined'} size={'lg'} color={'secondary'} onClick={() => {}}>
                  인증요청
                </Button>
              </FormCell>
            </FormRow>
            <FormRow>
              <FormCell title={'인증번호'}>
                <Input width={108} value={''} placeholder="" required />
                <Button variant={'outlined'} size={'lg'} color={'secondary'} disabled>
                  인증확인
                </Button>
                <Input width={50} value={'15:00'} placeholder="" readOnly />
                <Button variant={'outlined'} size={'lg'} color={'secondary'} onClick={() => {}}>
                  인증확인
                </Button>
                <Input width={50} value={'15:00'} placeholder="" />
              </FormCell>
            </FormRow>
            <FormRow>
              <FormCell title={'동의항목'}>
                <Grid className="w-full">
                  <CheckboxGroup
                    className="grid grid-cols-2 gap-1"
                    color="primary"
                    minSelected={0}
                    size="lg"
                    width="auto"
                    variant="default"
                  >
                    {[
                      { value: 'v1', label: '수집, 이용 및 조회' },
                      { value: 'v2', label: '고유식별정보 처리' },
                      { value: 'v3', label: '제3자 제공' },
                      { value: 'v4', label: '민감정보(상해/질병)처리' },
                    ].map((option) => (
                      <CheckboxGroupItem key={option.value} value={option.value}>
                        {option.label}
                      </CheckboxGroupItem>
                    ))}
                  </CheckboxGroup>
                </Grid>
              </FormCell>
            </FormRow>
          </FormTable>
          <Gcol className="w-full" placement="ss" variant="box-warning">
            <Typo icon="warning" variant="body-sm">
              통신사별 인증대기시간 경과 후 인증처리 불가합니다.
            </Typo>
            <BulletListItem size="sm" type={'dash'}>
              SK/LG : 15분, KT : 7분
            </BulletListItem>
          </Gcol>
        </TableFoldBody>
      </TableFold>
    </Grid>
  );
};

export default Ltpz01502;
