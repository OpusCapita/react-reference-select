### Synopsis

ReferenceSearchDialog react component

### Props Reference

| Name                           | Type                    | Description                                                                               |
| ------------------------------ | :---------------------- | -----------------------------------------------------------                               |
| openDialog                     | bool                    | Show search popup                                                                         |
| referenceSearchAction          | func                    | Callback fired when search action initiated.                                              |
| onCloseDialog                  | func                    | Callback fired when the popup closes.                                                     |
| onSelect                       | func                    | Callback fired when item is selected.                                                     |
| multiple                       | bool                    | Allows to select several elements. *Note*: if *true*, **value** must be array of objects. |
| objectIdentifier               | string                  | Field that uniquely identifies the object.                                                |
| modalSpecificProps             | string                  | Specific for Modal component props like 'onHide', 'onEnter', etc.                         |
| trimSearchParameters           | bool                    | Trim search parameters                                                                    |
| ...ReferenceSearchDialogProps  |                         | See `ReferenceSearchDialogProps/index.js` file for details.                               |

### Code Example

```
<ReferenceSearchDialog
  title="ReferenceSearchDialog"
  searchFields={[{name: "id", label: "ID"}]}
  resultFields={[{name: "id", label: "ID"}]}
  openDialog={ _scope.state.showModal }
  referenceSearchAction={(searchParams, callback) => {
    return callback({
      count: 3,
      items: [{"id": "A"}, {"id": "B"}, {"id": "C"}]
    })
  }}
  onCloseDialog={ _scope.toggleModal.bind(_scope) }
  onSelect={() => { console.log('selecting item') }}
  multiple={ false }
  objectIdentifier="id"
/>
```

### Contributors

Alexey Sergeev, Dmitriy Sanko

### Component Name

ReferenceSearchDialog

### License

Licensed by © 2017 OpusCapita 

