'use client';

import { useState } from 'react';
import EChartsReact from 'echarts-for-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/uiux/Card';
import { Button } from '@/shared/components/uiux/Button';

/**
 * Apache ECharts 예제 페이지
 * 강력하고 유연한 시각화 라이브러리로 고급 인터랙티브 차트를 만듭니다
 */
export default function Chart1Page() {
  const [chartType, setChartType] = useState<'line' | 'bar' | 'pie' | 'area' | 'scatter'>('line');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // 공통 데이터
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const salesData = [120, 132, 101, 134, 90, 230, 210, 120, 150, 200, 180, 160];
  const revenueData = [220, 182, 191, 234, 290, 330, 310, 220, 250, 290, 270, 300];

  // Line Chart 옵션
  const lineChartOption = {
    title: {
      text: 'Monthly Sales & Revenue Trend',
      left: 'center',
      textStyle: { color: theme === 'dark' ? '#fff' : '#000' },
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: theme === 'dark' ? '#333' : '#fff',
      textStyle: { color: theme === 'dark' ? '#fff' : '#000' },
      borderColor: theme === 'dark' ? '#555' : '#ddd',
    },
    legend: {
      data: ['Sales', 'Revenue'],
      bottom: 10,
      textStyle: { color: theme === 'dark' ? '#ccc' : '#333' },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: months,
      axisLine: { lineStyle: { color: theme === 'dark' ? '#555' : '#ccc' } },
      axisLabel: { color: theme === 'dark' ? '#ccc' : '#666' },
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: theme === 'dark' ? '#444' : '#eee' } },
      axisLabel: { color: theme === 'dark' ? '#ccc' : '#666' },
    },
    series: [
      {
        name: 'Sales',
        data: salesData,
        type: 'line',
        smooth: true,
        lineStyle: { width: 3, color: '#3b82f6' },
        itemStyle: { color: '#3b82f6', borderWidth: 2, borderColor: '#fff' },
        symbolSize: 8,
      },
      {
        name: 'Revenue',
        data: revenueData,
        type: 'line',
        smooth: true,
        lineStyle: { width: 3, color: '#10b981' },
        itemStyle: { color: '#10b981', borderWidth: 2, borderColor: '#fff' },
        symbolSize: 8,
      },
    ],
  };

  // Bar Chart 옵션
  const barChartOption = {
    title: {
      text: 'Monthly Sales Comparison',
      left: 'center',
      textStyle: { color: theme === 'dark' ? '#fff' : '#000' },
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: theme === 'dark' ? '#333' : '#fff',
      textStyle: { color: theme === 'dark' ? '#fff' : '#000' },
      borderColor: theme === 'dark' ? '#555' : '#ddd',
      axisPointer: {
        type: 'shadow',
        shadowStyle: { color: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' },
      },
    },
    legend: {
      data: ['Sales', 'Revenue'],
      bottom: 10,
      textStyle: { color: theme === 'dark' ? '#ccc' : '#333' },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: months,
      axisLine: { lineStyle: { color: theme === 'dark' ? '#555' : '#ccc' } },
      axisLabel: { color: theme === 'dark' ? '#ccc' : '#666' },
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: theme === 'dark' ? '#444' : '#eee' } },
      axisLabel: { color: theme === 'dark' ? '#ccc' : '#666' },
    },
    series: [
      {
        name: 'Sales',
        data: salesData,
        type: 'bar',
        itemStyle: { color: '#3b82f6', borderRadius: [8, 8, 0, 0] },
        emphasis: {
          itemStyle: { color: '#2563eb', borderRadius: [8, 8, 0, 0] },
        },
      },
      {
        name: 'Revenue',
        data: revenueData,
        type: 'bar',
        itemStyle: { color: '#10b981', borderRadius: [8, 8, 0, 0] },
        emphasis: {
          itemStyle: { color: '#059669', borderRadius: [8, 8, 0, 0] },
        },
      },
    ],
  };

  // Area Chart 옵션
  const areaChartOption = {
    title: {
      text: 'Monthly Sales & Revenue Area Chart',
      left: 'center',
      textStyle: { color: theme === 'dark' ? '#fff' : '#000' },
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: theme === 'dark' ? '#333' : '#fff',
      textStyle: { color: theme === 'dark' ? '#fff' : '#000' },
      borderColor: theme === 'dark' ? '#555' : '#ddd',
    },
    legend: {
      data: ['Sales', 'Revenue'],
      bottom: 10,
      textStyle: { color: theme === 'dark' ? '#ccc' : '#333' },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: months,
      axisLine: { lineStyle: { color: theme === 'dark' ? '#555' : '#ccc' } },
      axisLabel: { color: theme === 'dark' ? '#ccc' : '#666' },
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: theme === 'dark' ? '#444' : '#eee' } },
      axisLabel: { color: theme === 'dark' ? '#ccc' : '#666' },
    },
    series: [
      {
        name: 'Sales',
        data: salesData,
        type: 'line',
        smooth: true,
        lineStyle: { width: 2, color: '#3b82f6' },
        areaStyle: { color: 'rgba(59, 130, 246, 0.4)' },
        itemStyle: { color: '#3b82f6', borderWidth: 2, borderColor: '#fff' },
        symbolSize: 6,
      },
      {
        name: 'Revenue',
        data: revenueData,
        type: 'line',
        smooth: true,
        lineStyle: { width: 2, color: '#10b981' },
        areaStyle: { color: 'rgba(16, 185, 129, 0.4)' },
        itemStyle: { color: '#10b981', borderWidth: 2, borderColor: '#fff' },
        symbolSize: 6,
      },
    ],
  };

  // Pie Chart 옵션
  const pieChartOption = {
    title: {
      text: 'Product Distribution',
      left: 'center',
      textStyle: { color: theme === 'dark' ? '#fff' : '#000' },
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: theme === 'dark' ? '#333' : '#fff',
      textStyle: { color: theme === 'dark' ? '#fff' : '#000' },
      borderColor: theme === 'dark' ? '#555' : '#ddd',
      formatter: '{b}: {c} ({d}%)',
    },
    legend: {
      bottom: 10,
      textStyle: { color: theme === 'dark' ? '#ccc' : '#333' },
    },
    series: [
      {
        data: [
          { value: 1048, name: 'Product A' },
          { value: 735, name: 'Product B' },
          { value: 580, name: 'Product C' },
          { value: 484, name: 'Product D' },
          { value: 300, name: 'Product E' },
        ],
        type: 'pie',
        radius: ['40%', '70%'],
        label: {
          show: true,
          color: theme === 'dark' ? '#ccc' : '#666',
          fontSize: 12,
        },
        itemStyle: {
          borderColor: theme === 'dark' ? '#1f2937' : '#fff',
          borderWidth: 3,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  // Scatter Chart 옵션
  const scatterChartOption = {
    title: {
      text: 'Sales vs Revenue Correlation',
      left: 'center',
      textStyle: { color: theme === 'dark' ? '#fff' : '#000' },
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: theme === 'dark' ? '#333' : '#fff',
      textStyle: { color: theme === 'dark' ? '#fff' : '#000' },
      borderColor: theme === 'dark' ? '#555' : '#ddd',
      formatter: (params: any) => {
        if (params.data) {
          return `Sales: ${params.data[0]}<br/>Revenue: ${params.data[1]}`;
        }
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      name: 'Sales',
      nameTextStyle: { color: theme === 'dark' ? '#ccc' : '#666' },
      axisLine: { lineStyle: { color: theme === 'dark' ? '#555' : '#ccc' } },
      axisLabel: { color: theme === 'dark' ? '#ccc' : '#666' },
      splitLine: { lineStyle: { color: theme === 'dark' ? '#444' : '#eee' } },
    },
    yAxis: {
      type: 'value',
      name: 'Revenue',
      nameTextStyle: { color: theme === 'dark' ? '#ccc' : '#666' },
      axisLine: { lineStyle: { color: theme === 'dark' ? '#555' : '#ccc' } },
      axisLabel: { color: theme === 'dark' ? '#ccc' : '#666' },
      splitLine: { lineStyle: { color: theme === 'dark' ? '#444' : '#eee' } },
    },
    series: [
      {
        data: salesData.map((val, idx) => [val, revenueData[idx]]),
        type: 'scatter',
        symbolSize: 12,
        itemStyle: {
          color: '#3b82f6',
          borderColor: '#fff',
          borderWidth: 2,
        },
        emphasis: {
          itemStyle: {
            color: '#2563eb',
            borderWidth: 3,
          },
        },
      },
    ],
  };

  const getChartOption = () => {
    switch (chartType) {
      case 'line':
        return lineChartOption;
      case 'bar':
        return barChartOption;
      case 'area':
        return areaChartOption;
      case 'pie':
        return pieChartOption;
      case 'scatter':
        return scatterChartOption;
      default:
        return lineChartOption;
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="grid gap-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">Apache ECharts 예제</h1>
          <p className="text-gray-600">
            강력하고 유연한 시각화 라이브러리로 고급 인터랙티브 차트를 만듭니다
          </p>
        </div>

        {/* Chart Type Selector */}
        <Card>
          <CardHeader>
            <CardTitle>📊 차트 옵션</CardTitle>
            <CardDescription>
              차트 유형과 테마를 선택하세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">차트 유형</p>
              <div className="flex gap-2 flex-wrap">
                <Button
                  onClick={() => setChartType('line')}
                  variant={chartType === 'line' ? 'contained' : 'outlined'}
                  color="primary"
                >
                  📈 Line Chart
                </Button>
                <Button
                  onClick={() => setChartType('bar')}
                  variant={chartType === 'bar' ? 'contained' : 'outlined'}
                  color="primary"
                >
                  📊 Bar Chart
                </Button>
                <Button
                  onClick={() => setChartType('area')}
                  variant={chartType === 'area' ? 'contained' : 'outlined'}
                  color="primary"
                >
                  📉 Area Chart
                </Button>
                <Button
                  onClick={() => setChartType('scatter')}
                  variant={chartType === 'scatter' ? 'contained' : 'outlined'}
                  color="primary"
                >
                  📍 Scatter Plot
                </Button>
                <Button
                  onClick={() => setChartType('pie')}
                  variant={chartType === 'pie' ? 'contained' : 'outlined'}
                  color="primary"
                >
                  🥧 Pie Chart
                </Button>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">테마</p>
              <div className="flex gap-2">
                <Button
                  onClick={() => setTheme('light')}
                  variant={theme === 'light' ? 'contained' : 'outlined'}
                  color="primary"
                >
                  ☀️ Light
                </Button>
                <Button
                  onClick={() => setTheme('dark')}
                  variant={theme === 'dark' ? 'contained' : 'outlined'}
                  color="primary"
                >
                  🌙 Dark
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chart Display */}
        <Card>
          <CardHeader>
            <CardTitle>
              {chartType === 'line' && '📈 Line Chart'}
              {chartType === 'bar' && '📊 Bar Chart'}
              {chartType === 'area' && '📉 Area Chart'}
              {chartType === 'pie' && '🥧 Pie Chart'}
              {chartType === 'scatter' && '📍 Scatter Plot'}
            </CardTitle>
            <CardDescription>
              {chartType === 'pie'
                ? 'Product distribution'
                : chartType === 'scatter'
                  ? 'Sales vs Revenue correlation'
                  : 'Monthly data'}
            </CardDescription>
          </CardHeader>
          <CardContent className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
            <EChartsReact
              key={`${chartType}-${theme}`}
              option={getChartOption()}
              style={{ height: '400px' }}
              theme={theme}
            />
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle>✨ ECharts의 주요 특징</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">📊 30+ 차트 유형</h4>
                <ul className="text-sm space-y-1">
                  <li>✓ Line / Area / Bar / Pie</li>
                  <li>✓ Scatter / Bubble / Heatmap</li>
                  <li>✓ Candlestick / Sunburst</li>
                  <li>✓ Map / Gauge / Sankey</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">🎨 고급 시각화</h4>
                <ul className="text-sm space-y-1">
                  <li>✓ 다양한 테마</li>
                  <li>✓ 그래디언트 & 그림자</li>
                  <li>✓ 스무스 애니메이션</li>
                  <li>✓ 제너러스 이펙트</li>
                </ul>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">⚡ 강력한 인터랙션</h4>
                <ul className="text-sm space-y-1">
                  <li>✓ Zoom & Pan</li>
                  <li>✓ 데이터 필터</li>
                  <li>✓ Tooltip & Legend</li>
                  <li>✓ Visual Mapping</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">📈 성능 최적화</h4>
                <ul className="text-sm space-y-1">
                  <li>✓ 빅데이터 지원</li>
                  <li>✓ WebGL 렌더링</li>
                  <li>✓ 증분 업데이트</li>
                  <li>✓ 캐싱 메커니즘</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Code Example */}
        <Card>
          <CardHeader>
            <CardTitle>💻 사용 예제</CardTitle>
          </CardHeader>
          <CardContent className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">
{`import EChartsReact from 'echarts-for-react';

export default function MyChart() {
  const option = {
    title: { text: 'Sales Trend' },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    },
    yAxis: { type: 'value' },
    series: [{
      data: [120, 132, 101, 134, 90],
      type: 'line',
      smooth: true,
    }],
  };

  return (
    <EChartsReact
      option={option}
      style={{ height: '400px' }}
      theme="light"
    />
  );
}`}
            </pre>
          </CardContent>
        </Card>

        {/* Advanced Features */}
        <Card>
          <CardHeader>
            <CardTitle>🎯 고급 기능</CardTitle>
          </CardHeader>
          <CardContent className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">
{`// 1. 여러 차트 조합
const option = {
  series: [
    { data: [1, 2, 3], type: 'line' },
    { data: [3, 2, 1], type: 'bar' },
  ],
};

// 2. Visual Mapping (색상 매핑)
visualMap: {
  min: 0,
  max: 100,
  inRange: { color: ['blue', 'red'] },
}

// 3. Dynamic Data Update
// setOption({ series: [{ data: newData }] });

// 4. Event Handling
// chart.on('click', (params) => {})

// 5. Export
// chart.getDataURL();`}
            </pre>
          </CardContent>
        </Card>

        {/* Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>📊 다른 라이브러리와의 비교</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">특징</th>
                    <th className="text-left p-2">ECharts</th>
                    <th className="text-left p-2">Recharts</th>
                    <th className="text-left p-2">ApexCharts</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2">차트 유형</td>
                    <td className="p-2">30+</td>
                    <td className="p-2">10+</td>
                    <td className="p-2">15+</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">번들 크기</td>
                    <td className="p-2">~500KB</td>
                    <td className="p-2">~100KB</td>
                    <td className="p-2">~200KB</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">커스터마이징</td>
                    <td className="p-2">매우 좋음</td>
                    <td className="p-2">좋음</td>
                    <td className="p-2">기본</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">SSR 지원</td>
                    <td className="p-2">✅</td>
                    <td className="p-2">✅</td>
                    <td className="p-2">⚠️</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">빅데이터</td>
                    <td className="p-2">우수</td>
                    <td className="p-2">기본</td>
                    <td className="p-2">기본</td>
                  </tr>
                  <tr>
                    <td className="p-2">지도</td>
                    <td className="p-2">✅</td>
                    <td className="p-2">❌</td>
                    <td className="p-2">❌</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Info */}
        <Card>
          <CardHeader>
            <CardTitle>ℹ️ ECharts 사용 팁</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>
                💡 <strong>Option 객체</strong>: 모든 설정을 option 객체로 선언적으로 정의
              </li>
              <li>
                🎨 <strong>테마</strong>: 기본 제공되는 테마(light/dark) 또는 커스텀 테마 사용
              </li>
              <li>
                📦 <strong>번들 크기</strong>: 필요한 모듈만 임포트하여 최적화 가능
              </li>
              <li>
                ⚡ <strong>성능</strong>: 대용량 데이터 처리 시 WebGL 렌더링 사용
              </li>
              <li>
                🔄 <strong>업데이트</strong>: setOption()으로 동적 데이터 업데이트
              </li>
              <li>
                🌍 <strong>지도</strong>: GeoJSON 데이터로 지도 시각화 가능
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
