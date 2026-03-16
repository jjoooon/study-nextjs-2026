'use client';

import { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/uiux/Card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/uiux/Select';
import { msg, getMessage, getAvailableLocales, setLocale, getCurrentLocale } from '@/shared/utils/messageUtils';

export default function I18nDemoPage() {
  const [, setUpdateTrigger] = useState({});
  const availableLocales = getAvailableLocales();

  const handleLocaleChange = useCallback((locale: string) => {
    setLocale(locale);
    // ✅ 리렌더링 트리거 (messageUtils 싱글톤 사용 시 필요)
    setUpdateTrigger({});
  }, []);

  return (
    <div className="container mx-auto py-10">
      <div className="grid gap-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">{msg('header.title')}</h1>
          <p className="text-gray-600">
            {msg('messages.welcome')} - Current Language: {getCurrentLocale().toUpperCase()}
          </p>
        </div>

        {/* Language Switcher Variants */}
        <Card>
          <CardHeader>
            <CardTitle>🌐 {msg('common.language_select')}</CardTitle>
            <CardDescription>다양한 언어 선택 방식을 시도해보세요 (messageUtils 기반)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Locale Select (messageUtils 기반) */}
            <div>
              <h3 className="text-sm font-medium mb-3">Locale Select (messageUtils 기반)</h3>
              <div className="border rounded-lg p-4 bg-slate-50">
                <Select value={getCurrentLocale()} onValueChange={handleLocaleChange}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableLocales.map((locale) => (
                      <SelectItem key={locale.code} value={locale.code}>
                        <span className="mr-2">{locale.flag}</span>
                        {locale.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Translation Examples */}
        <Card>
          <CardHeader>
            <CardTitle>📚 {msg('common.language')} 샘플 텍스트</CardTitle>
            <CardDescription>현재 언어로 번역된 콘텐츠 확인</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">{getMessage('header.home')}</h4>
                <p className="text-sm text-gray-600">{getMessage('header.title')}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">{getMessage('header.dashboard')}</h4>
                <p className="text-sm text-gray-600">{getMessage('messages.language_changed')}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">{getMessage('header.products')}</h4>
                <p className="text-sm text-gray-600">{getMessage('footer.copyright')}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">{getMessage('header.settings')}</h4>
                <p className="text-sm text-gray-600">{getMessage('common.language_select')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Box */}
        <Card>
          <CardHeader>
            <CardTitle>ℹ️ 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>✅ 지원 언어: 한국어 (ko), 영어 (en), 일본어 (jp)</li>
              <li>✅ 사용 라이브러리: i18next & react-i18next</li>
              <li>✅ 언어 설정은 localStorage와 cookie에 저장됩니다</li>
              <li>✅ 페이지 새로고침 후에도 언어 설정이 유지됩니다</li>
              <li>✅ messageUtils를 사용하여 번역된 텍스트를 가져올 수 있습니다</li>
              <li>✅ 공개 폴더 (/public/locales)에 언어 파일을 추가하면 자동으로 로드됩니다</li>
              <li>✅ 브라우저 언어 자동 감지로 첫 방문 시 사용자의 기본 언어로 설정됩니다</li>
            </ul>
          </CardContent>
        </Card>
        {/* Message Examples */}
        <Card>
          <CardHeader>
            <CardTitle>📝 메시지 조회 예제</CardTitle>
            <CardDescription>messageUtils를 사용한 간단한 메시지 조회</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">getMessage() 사용법</h4>
              <pre className="text-sm bg-white p-2 rounded border mb-2">{`getMessage('header.title')`}</pre>
              <p className="text-sm">
                결과: <span className="font-medium">{getMessage('header.title')}</span>
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">msg() 사용법</h4>
              <pre className="text-sm bg-white p-2 rounded border mb-2">{`msg('header.home')`}</pre>
              <p className="text-sm">
                결과: <span className="font-medium">{msg('header.home')}</span>
              </p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">특정 locale으로 조회</h4>
              <pre className="text-sm bg-white p-2 rounded border mb-2">{`msg('header.dashboard', 'en')`}</pre>
              <p className="text-sm">
                결과: <span className="font-medium">{msg('header.dashboard', 'en')}</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Usage Examples */}
        <Card>
          <CardHeader>
            <CardTitle>💡 일반적인 사용법</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-slate-100 p-3 rounded">
              <h4 className="text-sm font-semibold mb-2">1. 현재 locale 조회</h4>
              <pre className="text-xs bg-white p-2 rounded">{`import { getCurrentLocale } from '@/shared/utils/messageUtils';
    
    const locale = getCurrentLocale(); // 'ko', 'en', 'jp' 등`}</pre>
            </div>

            <div className="bg-slate-100 p-3 rounded">
              <h4 className="text-sm font-semibold mb-2">2. 메시지 조회</h4>
              <pre className="text-xs bg-white p-2 rounded">{`import { getMessage } from '@/shared/utils/messageUtils';
    
    export const MyComponent = () => {
      return <h1>{getMessage('header.title')}</h1>;
    };`}</pre>
            </div>

            <div className="bg-slate-100 p-3 rounded">
              <h4 className="text-sm font-semibold mb-2">3. Locale 변경</h4>
              <pre className="text-xs bg-white p-2 rounded">{`import { setLocale } from '@/shared/utils/messageUtils';
    
    export const ChangeLocale = () => {
      return (
        <button onClick={() => setLocale('en')}>
          Change to English
        </button>
      );
    };`}</pre>
            </div>

            <div className="bg-slate-100 p-3 rounded">
              <h4 className="text-sm font-semibold mb-2">4. Locale 선택 드롭다운</h4>
              <pre className="text-xs bg-white p-2 rounded">{`import { LocaleSelect } from '@/shared/components/LocaleSelect';
    
    export const Header = () => {
      return (
        <header>
          <LocaleSelect />
        </header>
      );
    };`}</pre>
            </div>
          </CardContent>
        </Card>

        {/* Available Locales */}
        <Card>
          <CardHeader>
            <CardTitle>🗂️ 사용 가능한 Locale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {availableLocales.map((locale) => (
                <div key={locale.code} className="border rounded-lg p-4 text-center">
                  <div className="text-2xl mb-2">{locale.flag}</div>
                  <div className="font-semibold">{locale.name}</div>
                  <div className="text-sm text-gray-500">{locale.code}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Info */}
        <Card>
          <CardHeader>
            <CardTitle>ℹ️ 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>✅ messageUtils를 사용하면 i18next를 직접 import하지 않아도 됩니다</li>
              <li>✅ 메시지 조회는 항상 현재 locale 기준으로 동작합니다</li>
              <li>✅ LocaleSelect 컴포넌트로 드롭다운 형식의 locale 변경이 가능합니다</li>
              <li>✅ locale 변경 시 localStorage와 cookie에 자동으로 저장됩니다</li>
              <li>✅ React 컴포넌트와 순수 함수 모두에서 messageUtils를 사용할 수 있습니다</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
