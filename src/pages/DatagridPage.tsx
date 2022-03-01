import {DataGrid, GridSelectionType} from '@dellstorage/clarity-react/datagrid';

export default function DatagridPage() {
  return (
    <div className="container mx-auto py-10 px-6">
      <h2 className="text-3xl">Grid with all rows are selectable : (remove when clarity core v6 datagrid arrives)</h2>
      <p>https://github.com/EMCECS/clarity-react</p>

      <DataGrid
        columns={[
          {
            columnID: 0,
            columnName: 'User ID',
            isVisible: true,
            width: 100,
          },
          {
            columnID: 1,
            columnName: 'Name',
            isVisible: true,
            width: 100,
          },
          {
            columnID: 2,
            columnName: 'Creation Date',
            isVisible: true,
            width: 100,
          },
          {
            columnID: 3,
            columnName: 'Favorite color',
            isVisible: true,
            width: 100,
          },
        ]}
        rows={[
          {
            isSelected: false,
            rowData: [
              {
                cellData: 41512,
                columnName: 'User ID',
              },
              {
                cellData: 'Georgia',
                columnName: 'Name',
              },
              {
                cellData: 'Sep 11, 2008',
                columnName: 'Creation Date',
              },
              {
                cellData: 'Blue',
                columnName: 'Favorite color',
              },
            ],
            rowID: 0,
          },
          {
            isSelected: false,
            rowData: [
              {
                cellData: 16166,
                columnName: 'User ID',
              },
              {
                cellData: 'Brynn',
                columnName: 'Name',
              },
              {
                cellData: 'Aug 2, 2014',
                columnName: 'Creation Date',
              },
              {
                cellData: 'Orange',
                columnName: 'Favorite color',
              },
            ],
            rowID: 1,
          },
          {
            isSelected: false,
            rowData: [
              {
                cellData: 30574,
                columnName: 'User ID',
              },
              {
                cellData: 'Brad',
                columnName: 'Name',
              },
              {
                cellData: 'Jan 4, 2019',
                columnName: 'Creation Date',
              },
              {
                cellData: 'Yellow',
                columnName: 'Favorite color',
              },
            ],
            rowID: 2,
          },
        ]}
        selectionType={GridSelectionType.SINGLE}
      />
    </div>
  );
}
