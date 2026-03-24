import { Button, Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/shared/components/uiux';

export interface FileUploadResult {
  action: 'search' | 'select' | 'cancel';
  // TODO: @YunJunmo
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  files?: any;
}

export interface FileUploaderProps {
  title?: string;
  /** Promise resolve 함수 (결과 반환) */
  resolve: (result: FileUploadResult) => void;
}

export default function FileUploader({ resolve }: FileUploaderProps) {
  const handleSearch = () => {
    resolve({
      action: 'search',
    });
  };

  const handleUpload = () => {
    resolve({
      action: 'cancel',
    });
  };

  const handleCancel = () => {
    resolve({
      action: 'cancel',
    });
  };

  return (
    <Dialog open onOpenChange={handleCancel}>
      <DialogContent className="h-[80vh] w-360 min-w-7xl min-h-240" resizable={true}>
        <DialogHeader>
          <DialogTitle>파일업로드</DialogTitle>
        </DialogHeader>
        <div className="gap-8 flex-1 grid grid-rows-[auto_1fr] w-full px-[3.2rem]">upload table here</div>

        <DialogFooter>
          <Button variant="outline" size="lg" color="gray" onClick={handleSearch}>
            파일검색
          </Button>
          <Button variant="outline" size="lg" color="gray" onClick={handleCancel}>
            선택완료
          </Button>
          <Button variant="contained" size="lg" onClick={handleUpload}>
            닫기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
