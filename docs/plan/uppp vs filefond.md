# React 파일 업로드 라이브러리 상세 비교: Uppy vs FilePond

## 📊 개요

| 항목 | Uppy | FilePond |
|------|------|----------|
| **번들 크기** | 기본 ~180KB (플러그인 추가 시 증가) | ~20KB (gzipped) |
| **아키텍처** | 모듈형 플러그인 시스템 | 가벼운 코어 + 플러그인 |
| **React 통합** | `@uppy/react` 전용 패키지 | `react-filepond` 어댑터 |
| **UI 제공** | Dashboard, DragDrop, StatusBar, ProgressBar | FilePond 컴포넌트 |

---

## 🔧 Uppy 상세 분석

### 핵심 특징

#### 1. Tus 프로토콜 지원
- 재개 가능한 업로드 (Resumable Uploads)
- 네트워크 중단 시 자동 재시도
- 대용량 파일 업로드에 최적화

```javascript
import { Uppy, Tus, Dashboard } from 'uppy'

const uppy = new Uppy({
  autoProceed: false,
  restrictions: {
    maxFileSize: 1000000, // 1MB
    maxNumberOfFiles: 5,
    minNumberOfFiles: 1,
    allowedFileTypes: ['image/*', 'video/*']
  }
})
.use(Tus, {
  endpoint: 'https://tusd.tusdemo.net/files/',
  resume: true,
  autoRetry: true,
  retryDelays: [0, 1000, 3000, 5000]
})
.use(Dashboard, {
  target: '#app',
  inline: true,
  height: 470,
  metaFields: [
    { id: 'name', name: 'Name', placeholder: 'File name' },
    { id: 'caption', name: 'Caption', placeholder: 'Describe what the image is about' }
  ]
})
```

#### 2. Companion 서버 (OAuth 인증)
- Google Drive, Dropbox, Instagram, Facebook, OneDrive, Zoom 등과 연동
- OAuth 인증 플로우를 Companion 서버가 처리
- 원격 소스에서 직접 파일 선택 가능

```javascript
.use(RemoteSources, {
  companionUrl: 'https://companion.uppy.io',
  sources: ['GoogleDrive', 'Dropbox', 'Instagram', 'Facebook'],
  target: Dashboard,
  viewMode: 'grid'
})
```

#### 3. 이미지 편집 기능
- 크롭, 회전, 필터 적용
- Image Editor 플러그인으로 제공

```javascript
.use(ImageEditor, {
  target: Dashboard,
  quality: 0.8,
  cropperOptions: {
    viewMode: 1,
    aspectRatio: 1
  }
})
```

#### 4. Golden Retriever (파일 복구)
- 브라우저 크래시 후 파일 상태 복구
- IndexedDB에 파일 메타데이터 저장

#### 5. React 통합

```javascript
import { Uppy } from '@uppy/core'
import { Dashboard } from '@uppy/dashboard'
import { UppyContextProvider } from '@uppy/react'

function UploadComponent() {
  const [uppy] = useState(() => new Uppy().use(Dashboard))

  return (
    <UppyContextProvider uppy={uppy}>
      <Dashboard />
    </UppyContextProvider>
  )
}
```

---

## 🎯 FilePond 상세 분석

### 핵심 특징

#### 1. 가벼운 코어 (~20KB gzipped)
- 빠른 로딩 시간
- 번들 크기 최적화에 적합

#### 2. 다양한 입력 형식 지원

```javascript
import { FilePond } from 'react-filepond'
import 'filepond/dist/filepond.min.css'

function UploadComponent() {
  const [files, setFiles] = useState([])

  return (
    <FilePond
      files={files}
      onupdatefiles={setFiles}
      allowMultiple={true}
      maxFiles={5}
      maxFileSize={'500KB'}
      acceptedFileTypes={['image/png', 'image/jpeg']}
      server="/upload"
      name="files"
      labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
    />
  )
}
```

#### 3. 클라이언트 측 이미지 최적화

```javascript
<FilePond
  imageResizeTargetWidth={200}
  imageResizeTargetHeight={200}
  imageResizeMode={'contain'}
  imageResizeUpscale={false}
  imageTransformOutputQuality={0.8}
  imageEditAllowEdit={true}
/>
```

#### 4. 드래그 앤 드롭 파일 재정렬

```javascript
<FilePond
  allowReorder={true}
  allowReorderByDrag={true}
/>
```

#### 5. Pintura 이미지 에디터 통합
- FilePond 제작사의 유료 이미지 에디터
- 크롭, 필터, 보정 기능 제공

---

## 📈 성능 비교

| 메트릭 | Uppy | FilePond |
|--------|------|----------|
| **초기 로드** | 느림 (다수의 플러그인) | 빠름 (가벼운 코어) |
| **대용량 파일** | 우수 (Tus 프로토콜) | 양호 (청킹 지원) |
| **복수 파일 업로드** | 우수 (동시 업로드) | 양호 |
| **메모리 사용** | 높음 | 낮음 |

---

## 🎨 UI/UX 비교

### Uppy Dashboard
- 파일 관리, 메타데이터 입력, 프리뷰를 하나의 UI로 제공
- 모달 형태 또는 인라인 형태로 사용 가능
- 완전한 한국어 지원 (i18n)

```javascript
.use(Dashboard, {
  locale: {
    strings: {
      Browse: '찾아보기',
      dropPasteFiles: '파일을 드래그하거나 %{browse}',
      uploadXFiles: '%{smart_count}개 파일 업로드'
    }
  }
})
```

### FilePond
- 간결한 드롭존 UI
- 반응형 디자인
- 접근성 테스트 완료 (VoiceOver, JAWS)

---

## 💰 비용 및 라이선스

| 항목 | Uppy | FilePond |
|------|------|----------|
| **오픈소스** | MIT 라이선스 (무료) | MIT 라이선스 (무료) |
| **Companion 서버** | 직접 호스팅 필요 | 없음 |
| **이미지 에디터** | 무료 (내장) | Pintura (유료) |

---

## 🎯 사용 시나리오별 추천

### Uppy가 적합한 경우
- ✅ Google Drive, Dropbox 등 클라우드 스토리지와 연동 필요
- ✅ 대용량 파일 업로드가 빈번한 경우 (1GB+)
- ✅ Tus 프로토콜로 재개 가능한 업로드 필요
- ✅ 완전한 대시보드 UI가 필요한 경우
- ✅ OAuth 인증이 필요한 소셜 미디어 연동
- ✅ 웹캠/스크린샷 캡처 기능 필요

### FilePond가 적합한 경우
- ✅ 번들 크기 최적화가 중요한 경우
- ✅ 간단한 이미지 업로드 기능만 필요
- ✅ 빠른 초기 로딩 시간 요구
- ✅ 클라이언트 측 이미지 최적화 필요 (크기 조정, 압축)
- ✅ 드래그 앤 드롭 파일 재정렬 기능 필요
- ✅ 반응형 디자인이 중요한 모바일 앱

---

## 🛠️ TypeScript 지원

### Uppy
```typescript
import { Uppy } from '@uppy/core'
import { DashboardPlugin } from '@uppy/dashboard'

const uppy: Uppy = new Uppy({
  restrictions: {
    maxFileSize: 1000000,
    allowedFileTypes: ['image/*', '.pdf']
  }
})
```

### FilePond
```typescript
import { FilePond } from 'react-filepond'

const [files, setFiles] = useState<File[]>([])

<FilePond<File>
  files={files}
  onupdatefiles={setFiles}
/>
```

---

## 📦 설치 및 의존성

### Uppy
```bash
npm install @uppy/core @uppy/dashboard @uppy/tus @uppy/react
# 또는
npm install uppy # 전체 번들
```

### FilePond
```bash
npm install react-filepond filepond
npm install filepond-plugin-image-preview # 선택적 플러그인
npm install filepond-plugin-image-resize # 선택적 플러그인
```

---

## 🔍 결론

### 프로젝트 요구사항에 따른 선택 가이드

1. **간단한 이미지 업로드 + 빠른 성능** → FilePond 추천
2. **클라우드 스토리지 연동 + 대용량 파일** → Uppy 추천
3. **번들 크기 최적화** → FilePond 추천
4. **복잡한 업로드 워크플로우** → Uppy 추천
5. **모바일 우선 앱** → FilePond 추천 (가벼움)
6. **엔터프라이즈급 업로드 시스템** → Uppy 추천 (Companion 서버로 확장 가능)

---

## 참고자료

- Uppy 공식 문서: https://uppy.io
- FilePond 공식 문서: https://pqina.nl/filepond
- Tus 프로토콜 사양: https://tus.io
