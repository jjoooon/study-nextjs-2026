import { Gcol, Grow, Grid, Typo } from '@/shared/components/common';
import { ArrowIcon } from '@/shared/components/icons';
import { Badge, Button } from '@/shared/components/uiux';

export default function InsPlanBasicAside() {
  return (
    <Gcol placement="ts" className="gap-[3.2rem] h-[calc(100vh-32.2rem)] overflow-y-auto overflow-x-hidden pb-[3.2rem]">
      {/* 꼭 확인해야 할 일! */}
      <Gcol variant="box-line" placement="ts" className="w-full">
        <Grow placement="ms">
          <Typo variant="heading-l" tag="h3">
            꼭 확인해야 할 일!
          </Typo>
        </Grow>
        <Grid className="gap-[1.2rem] grid-cols-[1fr_1fr] w-full" placement="ms">
          <Gcol placement="ts" variant="box" className="p-[1.6rem] gap-[1.2rem] rounded-[1.2rem] bg-[#00C7680F]">
            <Badge variant="go" className="mb-2 rounded-full">
              GO
            </Badge>
            <Gcol placement="ts">
              <Button variant="text" className="gap-[.2rem] items-center">
                <Typo variant="button-m" weight="semibold" className="font-[#000] opacity-70">
                  계약자입력
                </Typo>
                <ArrowIcon size={12} color="#000" className="rotate-180 opacity-60" />
              </Button>
              <Typo tag="strong" weight="bold" className="font-[#000]">
                작업가능
              </Typo>
            </Gcol>
          </Gcol>
          <Gcol placement="ts" variant="box" className="p-[1.6rem] gap-[1.2rem] rounded-[1.2rem] bg-[#FFB82B1F]">
            <Badge variant="wait" className="mb-2 rounded-full">
              WAIT
            </Badge>
            <Gcol placement="ts">
              <Button variant="text" className="gap-[.2rem] items-center">
                <Typo variant="button-m" weight="semibold" className="font-[#000] opacity-70">
                  계약자입력
                </Typo>
                <ArrowIcon size={12} color="#000" className="rotate-180 opacity-60" />
              </Button>
              <Typo tag="strong" weight="bold" className="font-[#000]">
                확인필요
              </Typo>
            </Gcol>
          </Gcol>
          <Gcol
            placement="ts"
            variant="box"
            className="p-[1.6rem] gap-[1.2rem] rounded-[1.2rem] bg-[#FFF] border border-[#E5E5E5]"
          >
            <Badge variant="stop" className="mb-2 rounded-full">
              STOP
            </Badge>
            <Gcol placement="ts">
              <Button variant="text" className="gap-[.2rem] items-center">
                <Typo variant="button-m" weight="semibold" className="font-[#000] opacity-70">
                  계약자입력
                </Typo>
                <ArrowIcon size={12} color="#000" className="rotate-180 opacity-60" />
              </Button>
              <Typo tag="strong" weight="bold" className="font-[#000]">
                작업불가
              </Typo>
            </Gcol>
          </Gcol>
          <Gcol placement="ts" variant="box" className="p-[1.6rem] gap-[1.2rem] rounded-[1.2rem] bg-[#00C7680F]">
            <Badge variant="go" className="mb-2 rounded-full">
              GO
            </Badge>
            <Gcol placement="ts">
              <Button variant="text" className="gap-[.2rem] items-center">
                <Typo variant="button-m" weight="semibold" className="font-[#000] opacity-70">
                  작업상이해소
                </Typo>
                <ArrowIcon size={12} color="#000" className="rotate-180 opacity-60" />
              </Button>
              <Typo tag="strong" weight="bold" className="font-[#000]">
                작업가능
              </Typo>
            </Gcol>
          </Gcol>
        </Grid>
      </Gcol>
      {/* 바로가기 */}
      <Gcol placement="ts" className="w-full gap-[1.2rem]">
        <Grow placement="ms">
          <Typo variant="heading-l" tag="h3">
            바로가기
          </Typo>
        </Grow>
        <Grid className="gap-[.8rem] grid-cols-[1fr_1fr] w-full" placement="ms">
          <Button
            variant="ghost"
            className="px-[2rem] py-[1.2rem] border-none rounded-[1.2rem] bg-[#F8F8F8] justify-between h-auto"
          >
            <Typo variant="button-m" weight="semibold" className="font-[#000] opacity-70">
              설계메뉴얼
            </Typo>
            <ArrowIcon size={12} color="#000" className="rotate-180 opacity-60" />
          </Button>
          <Button
            variant="ghost"
            className="px-[2rem] py-[1.2rem] border-none rounded-[1.2rem] bg-[#F8F8F8] justify-between h-auto"
          >
            <Typo variant="button-m" weight="semibold" className="font-[#000] opacity-70">
              신정원조회
            </Typo>
            <ArrowIcon size={12} color="#000" className="rotate-180 opacity-60" />
          </Button>
          <Button
            variant="ghost"
            className="px-[2rem] py-[1.2rem] border-none rounded-[1.2rem] bg-[#F8F8F8] justify-between h-auto"
          >
            <Typo variant="button-m" weight="semibold" className="font-[#000] opacity-70">
              플랜조회/저장
            </Typo>
            <ArrowIcon size={12} color="#000" className="rotate-180 opacity-60" />
          </Button>
          <Button
            variant="ghost"
            className="px-[2rem] py-[1.2rem] border-none rounded-[1.2rem] bg-[#F8F8F8] justify-between h-auto"
          >
            <Typo variant="button-m" weight="semibold" className="font-[#000] opacity-70">
              실손정액조회
            </Typo>
            <ArrowIcon size={12} color="#000" className="rotate-180 opacity-60" />
          </Button>
        </Grid>
      </Gcol>
    </Gcol>
  );
}
