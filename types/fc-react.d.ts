import * as React from 'react'
import type {
  FCButton,
  FCCheckbox,
  FCComboBox,
  FCDataGrid,
  FCDataGridCell,
  FCDataGridRow,
  FCDialog,
  FCDivider,
  FCDropdown,
  FCIcon,
  FCInput,
  FCLink,
  FCListBox,
  FCListOption,
  FCMenu,
  FCMenuItem,
  FCNumberFiled,
  FCPanel,
  FCPanelHeader,
  FCRadio,
  FCRadioGroup,
  FCSelect,
  FCTab,
  FCTabPanel,
  FCTabs,
  FCTooltip,
  FCTreeItem,
  FCTreeView,
} from '../dist/esm'

type FCMap<T> = Partial<T> | React.DetailedHTMLProps<React.HTMLAttributes<T>, T>

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'fc-icon': FCMap<FCIcon>
      'fc-button': FCMap<FCButton>
      'fc-checkbox': FCMap<FCCheckbox>
      'fc-combobox': FCMap<FCComboBox>
      'fc-data-grid': FCMap<FCDataGrid>
      'fc-data-grid-row': FCMap<FCDataGridRow>
      'fc-data-grid-cell': FCMap<FCDataGridCell>
      'fc-dialog': FCMap<FCDialog>
      'fc-divider': FCMap<FCDivider>
      'fc-dropdown': FCMap<FCDropdown>
      'fc-input': FCMap<FCInput>
      'fc-link': FCMap<FCLink>
      'fc-list-option': FCMap<FCListOption>
      'fc-listbox': FCMap<FCListBox>
      'fc-menu': FCMap<FCMenu>
      'fc-menu-item': FCMap<FCMenuItem>
      'fc-number-field': FCMap<FCNumberFiled>
      'fc-radio': FCMap<FCRadio>
      'fc-radio-group': FCMap<FCRadioGroup>
      'fc-select': FCMap<FCSelect>
      'fc-tree-item': FCMap<FCTreeItem>
      'fc-tree-view': FCMap<FCTreeView>
      'fc-tab': FCMap<FCTab>
      'fc-tab-panel': FCMap<FCTabPanel>
      'fc-tabs': FCMap<FCTabs>
      'fc-tooltip': FCMap<FCTooltip>
      'fc-panel': FCMap<FCPanel>
      'fc-panel-header': FCMap<FCPanelHeader>
    }
  }
}
