'use client';

import { Gcol, Typo, FormItem, Grow } from '@atoms';
import { FormCell, FormTable } from '@common/FormTable';
import { DatePickerInput } from '@common/DatePicker';
import { SearchIcon } from '@/shared/components/icons';
import { Tabs, TabsLine, TabsContent, TabsList, TabsTrigger } from '@uiux/Tabs';
import { TableRow } from '@uiux/Table';
import { Input } from '@uiux/Input';
import { Button } from '@uiux/Button';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';

import { SELECT_OPTIONS } from '../constants/insPlanBasicData';
import type { TabData, InsuredData } from '../types/insPlanBasic';

interface InsPlanBasicStep2Props {
  active: string;
  currentData: TabData;
  activeInsured: number;
  testError: boolean;
  handleInsuredChange: (insuredIndex: number, field: keyof InsuredData, value: string) => void;
  handleInsuredTabChange: (value: string) => void;
  handleRemoveInsured: (index: number) => void;
  getInsuredData: (index: number) => InsuredData | undefined;
}

export function InsPlanBasicStep2({
  active,
  currentData,
  activeInsured,
  testError,
  handleInsuredChange,
  handleInsuredTabChange,
  handleRemoveInsured,
  getInsuredData,
}: InsPlanBasicStep2Props) {
  return (
    <Gcol className="gap-[1rem] w-full">
      <Grow placement="bwc">
        <Typo tag="h3" variant="heading-lg">
          피보험자
        </Typo>
        <Grow>
          <Button color="gray" variant="outlined" size="md">
            계약자와 동일
          </Button>
        </Grow>
      </Grow>

      <Tabs
        value={String(activeInsured)}
        onValueChange={handleInsuredTabChange}
        className="w-full h-full grid grid-rows-[auto_1fr] content-start"
      >
        <TabsLine>
          <TabsList>
            {currentData.insured && currentData.insured.length > 0 ? (
              currentData.insured.map((insuredItem, index) => (
                <TabsTrigger
                  key={index}
                  variant="default"
                  value={String(index)}
                  removable
                  onRemove={() => handleRemoveInsured(index)}
                >
                  피보험자 {index + 1}
                </TabsTrigger>
              ))
            ) : (
              <TabsTrigger variant="default" value="0">
                피보험자 1
              </TabsTrigger>
            )}
          </TabsList>
        </TabsLine>
        {currentData.insured &&
          currentData.insured.length > 0 &&
          currentData.insured.map((insuredItem, index) => {
            const currentInsured = getInsuredData(index);
            return (
              <TabsContent key={index} value={String(index)}>
                <FormTable
                  caption={`피보험자 ${index + 1} 정보`}
                  cols={['max-w-[20rem] w-[15%]', 'w-[35%]', 'max-w-[20rem] w-[15%]', 'w-[35%]']}
                >
                  <TableRow>
                    <FormCell title="피보험자">
                      <FormItem>
                        <Input
                          type="text"
                          required
                          error={testError}
                          errorMsg="피보험자 입력은 필수입니다."
                          errorPs="bl"
                          value={currentInsured?.name || ''}
                          onChange={(e) => handleInsuredChange(index, 'name', e.target.value)}
                        />
                        <Button aria-label="피보험자 검색" variant="none" only="icon" size="md">
                          <SearchIcon />
                        </Button>
                      </FormItem>
                    </FormCell>
                    <FormCell></FormCell>
                  </TableRow>

                  <TableRow>
                    <FormCell title="성별/나이">
                      <FormItem>
                        <NativeSelect
                          aria-label="성별 선택"
                          width="max"
                          readOnly={false}
                          required={false}
                          value={currentInsured?.gender || ''}
                          onChange={(e) => handleInsuredChange(index, 'gender', e.target.value)}
                        >
                          <NativeSelectOption value="">선택</NativeSelectOption>
                          {SELECT_OPTIONS.gender.map((item) => (
                            <NativeSelectOption key={item.value} value={item.value}>
                              {item.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                        <Input
                          type="text"
                          width="xs"
                          className="text-right"
                          value={currentInsured?.age || ''}
                          onChange={(e) => handleInsuredChange(index, 'age', e.target.value)}
                        />
                        <Button aria-label="연령계산" variant="outlined" size="md" color="gray">
                          연령계산
                        </Button>
                        <Typo tag="b">만 {currentInsured?.age}세</Typo>
                      </FormItem>
                    </FormCell>

                    <FormCell title="연령증가일">
                      <DatePickerInput
                        key={`${active}-${index}-ageIncreaseDate`}
                        value={currentInsured?.ageIncreaseDate || ''}
                        mode="single"
                        width="sm"
                        error={testError}
                        errorMsg="연령증가일은 필수입니다."
                        errorPs="bl"
                        onChange={(date, formattedValue) => {
                          handleInsuredChange(index, 'ageIncreaseDate', formattedValue ?? '');
                        }}
                      />
                    </FormCell>
                  </TableRow>
                  <TableRow>
                    <FormCell title="직업">
                      <Input
                        type="text"
                        value={currentInsured?.job || ''}
                        onChange={(e) => handleInsuredChange(index, 'job', e.target.value)}
                      />
                    </FormCell>
                    <FormCell title="실손정액조회일">
                      <FormItem>
                        <DatePickerInput
                          key={`${active}-${index}-lossDate`}
                          value={currentInsured?.lossDate || ''}
                          mode="single"
                          width="sm"
                          error={testError}
                          errorMsg="실손정액조회일은 필수입니다."
                          errorPs="bl"
                          onChange={(date, formattedValue) => {
                            handleInsuredChange(index, 'lossDate', formattedValue ?? '');
                          }}
                        />
                        <Button aria-label="실손정액 조회" variant="outlined" size="md" color="gray">
                          조회
                        </Button>
                      </FormItem>
                    </FormCell>
                  </TableRow>
                  <TableRow>
                    <FormCell title="운전형태">
                      <NativeSelect
                        aria-label="운전형태 선택"
                        width="max"
                        readOnly={false}
                        required={false}
                        value={currentInsured?.drivingType || ''}
                        onChange={(e) => handleInsuredChange(index, 'drivingType', e.target.value)}
                      >
                        <NativeSelectOption value="">선택</NativeSelectOption>
                        {SELECT_OPTIONS.drivingType.map((item) => (
                          <NativeSelectOption key={item.value} value={item.value}>
                            {item.label}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                    </FormCell>
                    <FormCell title="이륜차부담보">
                      <NativeSelect
                        aria-label="이륜차부담보 선택"
                        width="max"
                        readOnly={false}
                        required={false}
                        value={currentInsured?.twoWheeled || ''}
                        onChange={(e) => handleInsuredChange(index, 'twoWheeled', e.target.value)}
                      >
                        <NativeSelectOption value="">선택</NativeSelectOption>
                        {SELECT_OPTIONS.twoWheeled.map((item) => (
                          <NativeSelectOption key={item.value} value={item.value}>
                            {item.label}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                    </FormCell>
                  </TableRow>
                  <TableRow>
                    <FormCell title="계약자의">
                      <NativeSelect
                        aria-label="계약자의 선택"
                        width="max"
                        readOnly={false}
                        required={false}
                        value={currentInsured?.contractor || ''}
                        onChange={(e) => handleInsuredChange(index, 'contractor', e.target.value)}
                      >
                        <NativeSelectOption value="">선택</NativeSelectOption>
                        {SELECT_OPTIONS.relationship.map((item) => (
                          <NativeSelectOption key={item.value} value={item.value}>
                            {item.label}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                    </FormCell>
                    <FormCell title="피보험자의">
                      <NativeSelect
                        aria-label="피보험자의 선택"
                        width="max"
                        readOnly={false}
                        required={true}
                        value={currentInsured?.insured || ''}
                        onChange={(e) => handleInsuredChange(index, 'insured', e.target.value)}
                      >
                        <NativeSelectOption value="">선택</NativeSelectOption>
                        {SELECT_OPTIONS.relationship.map((item) => (
                          <NativeSelectOption key={item.value} value={item.value}>
                            {item.label}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                    </FormCell>
                  </TableRow>
                </FormTable>
              </TabsContent>
            );
          })}
      </Tabs>
    </Gcol>
  );
}
