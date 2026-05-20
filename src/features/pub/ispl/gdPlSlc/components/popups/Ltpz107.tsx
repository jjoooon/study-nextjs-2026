/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { Gcol, Grow, Typo } from '@atoms';
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
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@uiux/Table';

const Ltpz107 = () => {
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              보험표 납입면제 안내
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          <Gcol className="bg-[#EFF8FF] border border-[#CBE3FF] rounded-[0.6rem] p-[1rem]" placement="ss">
            <Typo tag={'strong'} variant={'body-lg'} weight={'bold'}>
              한화 3N5 더간편건강보험(세만기형) 2601
            </Typo>
            <Typo tag={'p'} variant={'body-sm'} color={'gray'}>
              1종(납입후50%해약환급금지급형, 납입면제운영형, 3N5간편고지형Ⅲ)
            </Typo>
          </Gcol>
          <TableFold>
            <TableFoldHead title="보험료 납입면제 사항(요약)"></TableFoldHead>
            <TableFoldBody>
              <Table variant="default">
                <colgroup>
                  <col style={{ width: '10rem' }} />
                  <col style={{ width: 'auto' }} />
                </colgroup>
                <TableHeader>
                  <TableRow>
                    <TableHead>구분</TableHead>
                    <TableHead>내용</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableHead>
                      납입면제<br></br> 적용사유
                    </TableHead>
                    <TableCell>
                      ①상해로 장해분류표에서 정한 장해지급률이 80% 이상에 해당하는 장해상태가 된 경우<br></br>
                      ②질병으로 장해분류표에서 정한 장해지급률이 80% 이상에 해당하는 장해상태가 된 경우<br></br>
                      ③납입면제 보장개시일 이후 **&quot;암&quot;**으로 진단확정된 경우 (*기타피부암, 갑상선암, 제자리암
                      및 경계성종양 제외)<br></br>
                      ④&quot;뇌졸중&quot;**으로 진단확정된 경우<br></br>
                      ⑤&quot;급성심근경색증&quot;**으로 진단확정된 경우<br></br>
                      ⑥&quot;특정상해성뇌출혈&quot;**로 진단확정된 경우
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead>
                      납입면제<br></br> 제외대상
                    </TableHead>
                    <TableCell>
                      ① 갱신특약<br></br>② 보장보험료 50% 납입지원Ⅱ(4대유사암(간편)) 특별약관<br></br>③ 무배당 질병치료
                      관련 보장 Ⅱ 특별약관<br></br>· 암(4대유사암 제외) 특정치료비(종합병원)(각연간 1회한)(간편)
                      <br></br>· 4대유사암 특정치료비(종합병원)(각연간 1회한)(간편)<br></br>· 암(4대유사암 제외)
                      특정치료비(암전문의료기관Ⅱ)(상급 종합병원 등)(각연간 1회한)(간편)<br></br>· 4대유사암
                      특정치료비(암전문의료기관Ⅱ)(상급 종합병원 등)(각연간 1회한)(간편)<br></br>· 하이클래스
                      암(특정유사암 포함) 특정치료비(연간 1회한)(간편)<br></br>· 암검사 및 치료비(간편)<br></br>
                      비급여(전액본인부담금 포함) 암(4대유사암 제외) 특정치료비(각연간 1회한)(간편)
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableFoldBody>
          </TableFold>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} color={'gray'} size={'xl'}>
                출력
              </Button>
              <Button variant={'contained'} size={'xl'}>
                알림톡발송
              </Button>
              <DialogClose asChild>
                <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                  닫기
                </Button>
              </DialogClose>
            </Grow>
          </DialogFooterArea>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz107;
