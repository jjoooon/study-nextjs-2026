#!/usr/bin/env python3
import re
import sys

# Read the file
file_path = 'src/features/pub/ispl/ncMtt/components/Ltpa35003.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the string to replace - LayoutScrollWrap opening tag to closing tag
pattern = r'            <LayoutScrollWrap className="grid-cols-\[1fr_auto\] gap-3">.*?            </LayoutScrollWrap>'

replacement = '''            <QuestionSection
              qAnswerList={qAnswerList}
              setQAnswerList={setQAnswerList}
              highlightBadgeNum={highlightBadgeNum ?? 1}
              setHighlightBadgeNum={setHighlightBadgeNum}
              form={form}
              setFormField={setFormField}
              _simpleMode={_simpleMode}
              periodType={periodType}
              setPeriodType={setPeriodType}
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
              scrollToCard={scrollToCard}
              badgeLabelNumbers={badgeLabelNumbers}
              loadedCount={loadedCount}
              setLoadedCount={setLoadedCount}
              totalCount={totalCount}
              pageSize={pageSize}
              handleLoadAll={handleLoadAll}
              handleLoadNext={handleLoadNext}
              columnDefs={columnDefs}
              DummyData={DummyData}
            />'''

new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

# Also need to add import
if 'import { QuestionSection }' not in new_content:
    import_pattern = r"(import { useTabs } from '@/shared/hooks/useTabs';)\n\nimport '@/shared/lib/agGridPub';"
    import_replacement = r"\1\nimport { QuestionSection } from './QuestionSection';\n\nimport '@/shared/lib/agGridPub';"
    new_content = re.sub(import_pattern, import_replacement, new_content)

# Write the file
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("✓ File updated successfully")
sys.exit(0)
