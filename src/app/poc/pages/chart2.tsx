'use client';

import { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/uiux/Card';
import { Button } from '@/shared/components/uiux/Button';

/**
 * Recharts 예제 페이지
 * 다양한 차트 유형과 커스터마이징을 보여줍니다
 */
export default function Chart2Page() {
  const [chartType, setChartType] = useState<'line' | 'bar' | 'pie' | 'area' | 'scatter'>('line');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // 월별 데이터
  const monthData = [
    { month: 'Jan', sales: 4000, revenue: 2400, users: 2400 },
    { month: 'Feb', sales: 3000, revenue: 1398, users: 2210 },
    { month: 'Mar', sales: 2000, revenue: 9800, users: 2290 },
    { month: 'Apr', sales: 2780, revenue: 3908, users: 2000 },
    { month: 'May', sales: 1890, revenue: 4800, users: 2181 },
    { month: 'Jun', sales: 2390, revenue: 3800, users: 2500 },
    { month: 'Jul', sales: 3490, revenue: 4300, users: 2100 },
  ];

  // 분기별 데이터
  const quarterData = [
    { quarter: 'Q1', sales: 9000, revenue: 13800, users: 8900 },
    { quarter: 'Q2', sales: 7660, revenue: 12508, users: 8681 },
    { quarter: 'Q3', sales: 3880, revenue: 9800, users: 9200 },
    { quarter: 'Q4', sales: 5490, revenue: 10300, users: 7800 },
  ];

  // 연간 데이터
  const yearData = [
    { year: '2022', sales: 28000, revenue: 46300, users: 31900 },
    { year: '2023', sales: 27000, revenue: 36200, users: 32500 },
    { year: '2024', sales: 32000, revenue: 42200, users: 38200 },
    { year: '2025', sales: 35000, revenue: 48300, users: 41100 },
  ];

  // Pie 차트 데이터
  const pieData = [
    { name: 'Product A', value: 400, fill: '#3b82f6' },
    { name: 'Product B', value: 300, fill: '#10b981' },
    { name: 'Product C', value: 300, fill: '#f59e0b' },
    { name: 'Product D', value: 200, fill: '#ef4444' },
    { name: 'Product E', value: 100, fill: '#8b5cf6' },
  ];

  // Scatter 차트 데이터
  const scatterData = monthData.map(item => ({
    sales: item.sales,
    revenue: item.revenue,
    name: item.month,
  }));


  let displayData = monthData;
  let xDataKey = 'month';

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="container mx-auto py-10">
      <div className="grid gap-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">Recharts 예제</h1>
          <p className="text-gray-600">
            완전히 React로 구성된 차트 라이브러리로 높은 커스터마이징이 가능합니다
          </p>
        </div>

        {/* Controls */}
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
                  variant={chartType === 'line' ? 'contained' : 'outline'}
                  color="primary"
                >
                  📈 Line Chart
                </Button>
                <Button
                  onClick={() => setChartType('bar')}
                  variant={chartType === 'bar' ? 'contained' : 'outline'}
                  color="primary"
                >
                  📊 Bar Chart
                </Button>
                <Button
                  onClick={() => setChartType('area')}
                  variant={chartType === 'area' ? 'contained' : 'outline'}
                  color="primary"
                >
                  📉 Area Chart
                </Button>
                <Button
                  onClick={() => setChartType('scatter')}
                  variant={chartType === 'scatter' ? 'contained' : 'outline'}
                  color="primary"
                >
                  📍 Scatter Plot
                </Button>
                <Button
                  onClick={() => setChartType('pie')}
                  variant={chartType === 'pie' ? 'contained' : 'outline'}
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
                  variant={theme === 'light' ? 'contained' : 'outline'}
                  color="primary"
                >
                  ☀️ Light
                </Button>
                <Button
                  onClick={() => setTheme('dark')}
                  variant={theme === 'dark' ? 'contained' : 'outline'}
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
              {chartType === 'scatter' && '📍 Scatter Plot'}
              {chartType === 'pie' && '🥧 Pie Chart'}
            </CardTitle>
            <CardDescription>
              {chartType === 'pie'
                ? 'Product distribution'
                : chartType === 'scatter'
                  ? 'Sales vs Revenue correlation'
                  : 'Monthly sales data'}
            </CardDescription>
          </CardHeader>
          <CardContent className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
            {chartType === 'line' && (
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={displayData}>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke={theme === 'dark' ? '#444' : '#e5e7eb'}
                  />
                  <XAxis 
                    dataKey={xDataKey} 
                    stroke={theme === 'dark' ? '#999' : '#666'}
                    style={{ fontSize: '12px', fill: theme === 'dark' ? '#999' : '#666' }}
                  />
                  <YAxis 
                    stroke={theme === 'dark' ? '#999' : '#666'}
                    style={{ fontSize: '12px', fill: theme === 'dark' ? '#999' : '#666' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: theme === 'dark' ? '#333' : '#fff',
                      border: `1px solid ${theme === 'dark' ? '#555' : '#ddd'}`,
                      color: theme === 'dark' ? '#ccc' : '#000',
                    }}
                  />
                  <Legend 
                    wrapperStyle={{
                      color: theme === 'dark' ? '#ccc' : '#333',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ fill: '#10b981', r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    dot={{ fill: '#f59e0b', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}

            {chartType === 'bar' && (
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={displayData}>
                  <CartesianGrid 
                    strokeDasharray="3 3"
                    stroke={theme === 'dark' ? '#444' : '#e5e7eb'}
                  />
                  <XAxis 
                    dataKey={xDataKey}
                    stroke={theme === 'dark' ? '#999' : '#666'}
                    style={{ fontSize: '12px', fill: theme === 'dark' ? '#999' : '#666' }}
                  />
                  <YAxis 
                    stroke={theme === 'dark' ? '#999' : '#666'}
                    style={{ fontSize: '12px', fill: theme === 'dark' ? '#999' : '#666' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: theme === 'dark' ? '#333' : '#fff',
                      border: `1px solid ${theme === 'dark' ? '#555' : '#ddd'}`,
                      color: theme === 'dark' ? '#ccc' : '#000',
                    }}
                  />
                  <Legend 
                    wrapperStyle={{
                      color: theme === 'dark' ? '#ccc' : '#333',
                    }}
                  />
                  <Bar dataKey="sales" fill="#3b82f6" />
                  <Bar dataKey="revenue" fill="#10b981" />
                  <Bar dataKey="users" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            )}

            {chartType === 'area' && (
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={displayData}>
                  <CartesianGrid 
                    strokeDasharray="3 3"
                    stroke={theme === 'dark' ? '#444' : '#e5e7eb'}
                  />
                  <XAxis 
                    dataKey={xDataKey}
                    stroke={theme === 'dark' ? '#999' : '#666'}
                    style={{ fontSize: '12px', fill: theme === 'dark' ? '#999' : '#666' }}
                  />
                  <YAxis 
                    stroke={theme === 'dark' ? '#999' : '#666'}
                    style={{ fontSize: '12px', fill: theme === 'dark' ? '#999' : '#666' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: theme === 'dark' ? '#333' : '#fff',
                      border: `1px solid ${theme === 'dark' ? '#555' : '#ddd'}`,
                      color: theme === 'dark' ? '#ccc' : '#000',
                    }}
                  />
                  <Legend 
                    wrapperStyle={{
                      color: theme === 'dark' ? '#ccc' : '#333',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    fill="#3b82f6"
                    stroke="#3b82f6"
                    fillOpacity={0.3}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    fill="#10b981"
                    stroke="#10b981"
                    fillOpacity={0.3}
                  />
                  <Area
                    type="monotone"
                    dataKey="users"
                    fill="#f59e0b"
                    stroke="#f59e0b"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}

            {chartType === 'pie' && (
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={{ fill: theme === 'dark' ? '#ccc' : '#666' }}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: theme === 'dark' ? '#333' : '#fff',
                      border: `1px solid ${theme === 'dark' ? '#555' : '#ddd'}`,
                      color: theme === 'dark' ? '#ccc' : '#000',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}

            {chartType === 'scatter' && (
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart data={scatterData}>
                  <CartesianGrid 
                    strokeDasharray="3 3"
                    stroke={theme === 'dark' ? '#444' : '#e5e7eb'}
                  />
                  <XAxis 
                    type="number"
                    dataKey="sales"
                    name="Sales"
                    stroke={theme === 'dark' ? '#999' : '#666'}
                    style={{ fontSize: '12px', fill: theme === 'dark' ? '#999' : '#666' }}
                  />
                  <YAxis 
                    type="number"
                    dataKey="revenue"
                    name="Revenue"
                    stroke={theme === 'dark' ? '#999' : '#666'}
                    style={{ fontSize: '12px', fill: theme === 'dark' ? '#999' : '#666' }}
                  />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    contentStyle={{
                      backgroundColor: theme === 'dark' ? '#333' : '#fff',
                      border: `1px solid ${theme === 'dark' ? '#555' : '#ddd'}`,
                      color: theme === 'dark' ? '#ccc' : '#000',
                    }}
                  />
                  <Scatter 
                    dataKey="revenue"
                    name="Sales vs Revenue"
                    fill="#3b82f6"
                  />
                </ScatterChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle>✨ Recharts의 주요 특징</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">⚡ React 기반</h4>
                <ul className="text-sm space-y-1">
                  <li>✓ React 컴포넌트로 구성</li>
                  <li>✓ JSX로 간단하게 구성</li>
                  <li>✓ Props로 쉽게 커스터마이징</li>
                  <li>✓ React 생태계 연동 우수</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">🎯 반응형 디자인</h4>
                <ul className="text-sm space-y-1">
                  <li>✓ ResponsiveContainer</li>
                  <li>✓ 자동 리사이즈</li>
                  <li>✓ 모바일 친화적</li>
                  <li>✓ 터치 지원</li>
                </ul>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">🎨 커스터마이징</h4>
                <ul className="text-sm space-y-1">
                  <li>✓ 색상 커스턴</li>
                  <li>✓ 세밀한 스타일 제어</li>
                  <li>✓ 컴포넌트 조합</li>
                  <li>✓ 이벤트 핸들러</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">📊 다양한 차트</h4>
                <ul className="text-sm space-y-1">
                  <li>✓ Line / Area / Bar</li>
                  <li>✓ Pie / Radar</li>
                  <li>✓ Scatter / Composed</li>
                  <li>✓ Custom Shape</li>
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
{`import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', sales: 4000, revenue: 2400 },
  { month: 'Feb', sales: 3000, revenue: 1398 },
];

export default function MyChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="sales" 
          stroke="#3b82f6" 
          strokeWidth={2}
        />
        <Line 
          type="monotone" 
          dataKey="revenue" 
          stroke="#10b981" 
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}`}
            </pre>
          </CardContent>
        </Card>

        {/* Advanced Example */}
        <Card>
          <CardHeader>
            <CardTitle>🎯 고급 활용법</CardTitle>
          </CardHeader>
          <CardContent className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">
{`// 커스텀 Tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded border">
        <p>{payload[0].payload.month}</p>
        <p>Sales: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

// Pie 차트 with 커스텀 Label
const renderLabel = ({ name, value }) => {
  return \`\${name}: \${value}\`;
};

// 사용
<LineChart data={data}>
  <Tooltip content={<CustomTooltip />} />
</LineChart>

<PieChart>
  <Pie
    data={pieData}
    label={renderLabel}
    outerRadius={120}
  />
</PieChart>`}
            </pre>
          </CardContent>
        </Card>

        {/* Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>📊 Recharts와 Apache ECharts 비교</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">특징</th>
                    <th className="text-left p-2">Recharts</th>
                    <th className="text-left p-2">Apache ECharts</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2">번들 크기</td>
                    <td className="p-2">~100KB</td>
                    <td className="p-2">~600KB+</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">SSR 지원</td>
                    <td className="p-2">✅ 지원</td>
                    <td className="p-2">❌ 복잡함</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">커스터마이징</td>
                    <td className="p-2">매우 좋음</td>
                    <td className="p-2">매우 좋음</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">React 통합</td>
                    <td className="p-2">완벽 (기본)</td>
                    <td className="p-2">래퍼 필요<br/>(echarts-for-react)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">기본 기능</td>
                    <td className="p-2">기본</td>
                    <td className="p-2">매우 풍부</td>
                  </tr>
                  <tr>
                    <td className="p-2">학습곡선</td>
                    <td className="p-2">낮음</td>
                    <td className="p-2">중간 ~ 높음</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Info */}
        <Card>
          <CardHeader>
            <CardTitle>ℹ️ Recharts 사용 팁</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>
                💡 <strong>ResponsiveContainer</strong>: 항상 사용하여 반응형 디자인 보장
              </li>
              <li>
                🎯 <strong>데이터 구조</strong>: 배열 형식의 객체 데이터 필요 ({'{'}month: 'Jan', sales: 4000{'}'})
              </li>
              <li>
                🔄 <strong>상태 관리</strong>: 데이터 변경 시 자동으로 리렌더링 (React 특성)
              </li>
              <li>
                ⚡ <strong>성능</strong>: 대량의 데이터포인트 사용 시 SVG 렌더링 최적화 필요
              </li>
              <li>
                🎨 <strong>커스텀</strong>: 각 요소(dot, label 등)를 렌더 함수로 커스터마이징 가능
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
