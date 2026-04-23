'use client';

import { Gcol, Grid, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import {
  DialogClose,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogFooterArea,
  DialogHeader,
  DialogSection,
  DialogTitle,
} from '@uiux/Dialog';
import { QuestionRadioCard } from '@/shared/components/common/QuestionRadioCard';
import type { PopupBaseProps } from '@/shared/types/uiTypes';

export const Ltpz003 = ({ open, onOpenChange }: PopupBaseProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              알릴사항 미리보기
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[1fr]">
          <Gcol placement="ss" gap={1} className="w-full">
            <QuestionRadioCard
              badgeLabel="1"
              question="최근 3개월 이내에 의사로부터 진찰 또는 검사(건강검진 포함)를 통하여 다음과 같은 의료행위를 받은 사실이 있습니까?"
              isRadio={true}
              isValue="Y"
              disabled
            >
              <Gcol className="w-full" placement="ss">
                <Grid className="w-full grid-cols-4 gap-[0.8rem] px-[1rem]">
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    질병확정진단
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    질병의심소견
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    치료
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    입원
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    수술(제왕절개포함)
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    투약
                  </Checkbox>
                </Grid>
                <Gcol className="w-full" placement="ss" variant="box-detail">
                  <Typo icon="detail" variant="body-sm">
                    <b>질병의심소견</b>이란 의사가 진단서나 소견서 또는 진료의뢰서 등을 포함하여 서면(전자문서 포함)으로
                    교부한 경우를 말합니다.
                  </Typo>
                  <Typo icon="detail" variant="body-sm">
                    <b>투약이란</b> 의사가 환자에게 약을 처방하는 행위를 말하는 것으로 실제로 약을 구입하지 않았어도
                    기재해야 합니다.
                  </Typo>
                </Gcol>
              </Gcol>
            </QuestionRadioCard>
            <QuestionRadioCard
              badgeLabel="2"
              question="최근 3개월 이내에 마약을 사용하거나 혈압강하제, 신경안정제, 수면제, 각성제(흥분제), 진통제 등 약물을 상시 복용한 사실이 있습니까?"
              isRadio={true}
              isValue="Y"
              disabled
            >
              <Gcol className="w-full" placement="ss">
                <Gcol className="w-full" placement="ss" variant="box-detail">
                  <Typo icon="detail" variant="body-sm">
                    <b>혈압강하제</b>란 혈압을 내리게 하는 의약품을 말하며, 각성제란 신경계를 흥분시켜 잠이 오는 것을
                    억제하는 의약품을 말합니다.
                  </Typo>
                </Gcol>
              </Gcol>
            </QuestionRadioCard>
            <QuestionRadioCard
              badgeLabel="3"
              question="최근 1년 이내에 의사로부터 진찰 또는 검사를 받고, 이를 통하여 추가검사(재검사)를 받은 사실이 있습니까?"
              isRadio={true}
              isValue="Y"
              disabled
            >
              <Gcol className="w-full" placement="ss">
                <Gcol className="w-full" placement="ss" variant="box-detail">
                  <Typo icon="detail" variant="body-sm">
                    <b>추가검사(재검사)</b>란 검사 결과 이상 소견이 확인되어 보다 정확한 진단을 위해 시행한 검사를
                    의미하며, 병증에 대한 치료 필요 없이 유지되는 상태에서 시행하는 정기검사 또는 추적관찰은 포함하지
                    않습니다.
                  </Typo>
                </Gcol>
              </Gcol>
            </QuestionRadioCard>
            <QuestionRadioCard
              badgeLabel="4"
              question="최근 5년 이내에 의사로부터 진찰 또는 검사를 통하여 다음과 같은 의료행위를 받은 사실이 있습니까?"
              isRadio={true}
              isValue="Y"
              disabled
            >
              <Gcol className="w-full" placement="ss">
                <Grid className="w-full grid-cols-4 gap-[0.8rem] px-[1rem]">
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    입원
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    수술(제왕제갤포함)
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    계속하여 7일이상 치료
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    계속하여 30일이상 투약
                  </Checkbox>
                </Grid>
              </Gcol>
            </QuestionRadioCard>
            <QuestionRadioCard
              badgeLabel="5"
              question="최근 5년 이내에 아래의 질병으로 의사로부터 진찰 또는 검사를 통하여 다음과 같은 의료행위를 받은 사실이 있습니까?"
              isRadio={true}
              isValue="Y"
              disabled
            >
              <Gcol className="w-full" placement="ss">
                <Grid className="w-full grid-cols-4 gap-[0.8rem] px-[1rem]">
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    암
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    백혈병
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    고혈압
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    협심증
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    심근경색
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    심장판막
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    간경화증
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    뇌졸중증(뇌출혈, 뇌경색)
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    당뇨병
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    에이즈(AIDS) 및 HIV보균
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    직장 또는 항문 관련 질환(치질, 치루(누공), 치열(찢어짐))
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    항문 농양(고름집)
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    직장또는
                  </Checkbox>
                </Grid>
              </Gcol>
            </QuestionRadioCard>
          </Gcol>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
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
