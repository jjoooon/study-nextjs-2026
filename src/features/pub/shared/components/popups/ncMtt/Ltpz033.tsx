/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@uiux/Table';

const Ltpz033 = () => {
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              질병검색 및 입력
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection>
          <Typo variant="body-lg">
            <b>기타치료</b>란에 입력하는 경우 <b className="text-[#E43939]">자동심사가 불가능</b>하며, 우선심사순서에
            따라 <b>후순위로 배정</b>되어 심사결과 안내까지 시간이 소요될 수 있습니다.
          </Typo>
          <Gcol gap="2" placement="ss">
            <Table variant="default">
              <colgroup>
                <col style={{ width: '15rem' }} />
                <col style={{ width: 'auto' }} />
              </colgroup>
              <TableHeader>
                <TableRow>
                  <TableHead>치료내용</TableHead>
                  <TableHead>치료예시</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableHead className="text-left">진단/검사/검진</TableHead>
                  <TableCell>건강검진(국가, 직장), 검사, 검사권유 등</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="text-left">
                    약물치료<br></br>(주사, 안약, 연고 등)
                  </TableHead>
                  <TableCell>
                    약처방, 주사, 링거(링겔, 영양제), 연고, 안약, 흡입제(네블라이저), 인대강화/관절강내/윤활강내주사,
                    인슐린 등 모든 약물치료에 해당
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="text-left">수술/시술(봉합술)</TableHead>
                  <TableCell>
                    신경차단술(신경성형술, 신경주사시술), 고주파, 쇄석술, 체외충격파, 관절경 등 모든 수술/시술치료에
                    해당
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="text-left">치과치료</TableHead>
                  <TableCell>레진, 임플란트, 교정, 크라운, 인레이, 스케일링 등</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="text-left">드레싱(소독)</TableHead>
                  <TableCell>소독, 드레싱</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="text-left">물리/도수/깁스</TableHead>
                  <TableCell>깁스, 반깁스, 캐스트, 견인 등</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="text-left">침/뜸/부황/추나</TableHead>
                  <TableCell>침, 뜸, 부황, 추나요법</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="text-left">상담/언어치료</TableHead>
                  <TableCell>심리상담치료, 놀이치료, 언어치료, 그림치료, 음악치료 등</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="text-left">
                    기타치료 <span className="text-[#E43939]">(자동인수불가)</span>
                  </TableHead>
                  <TableCell>
                    휴유 및 합병증, 다수 동반질환, 장해진단, 상기 치료내용에 없는 경우(양압기, 산소치료, 광선치료,
                    적외선 등)
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Gcol className="w-full" placement="ss" variant="box-info">
              <Typo icon="info" variant="body-sm">
                고지 상병별 필요한 심사정보가 있는 경우 추가질문을 운영중이며,<br></br> &quot;이상소견없음&quot;,
                &quot;완치됨&quot; 등의 내용은 &quot;완치&quot;로 고지하시면 심사에 반영됩니다.
                <br />
              </Typo>
            </Gcol>
          </Gcol>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Typo variant="body-md" weight={'bold'} color={'danger'} className="mr-2">
                기타치료 고지들 하시겠습니까?
              </Typo>
              <Button variant={'contained'} size={'xl'}>
                예
              </Button>
              <DialogClose asChild>
                <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                  아니오
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

export default Ltpz033;
