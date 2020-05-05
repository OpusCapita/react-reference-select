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
| sort                           | string                  | Sorted field                                                                              |
| order                          | string                  | Sorted field order                                                                        |
| ...ReferenceSearchDialogProps  |                         | See `ReferenceSearchDialogProps/index.js` file for details.                               |
/**
     * Sorted field
     */
    sort: PropTypes.string,
    /**
     * Sorted field order
     */
    order: PropTypes.string
### Code Example

```
<ReferenceSearchDialog
  title="ReferenceSearchDialog"
  searchFields={[{name: "id", label: "ID"}]}
  resultFields={[{name: "id", label: "ID"}]}
  openDialog={ _scope.state.showModal }
  referenceSearchAction={(searchParams, callback) => {
    return callback({
        count: 12,
        items: [
          {"id": "1", "name": "example1"},
          {"id": "2", "name": "example2"},
          {"id": "3", "name": "example3"},
          {"id": "4", "name": "example4"},
          {"id": "5", "name": "example5"},
          {"id": "6", "name": "example6"},
          {"id": "7", "name": "example7"},
          {"id": "8", "name": "example8"},
          {"id": "9", "name": "example9"},
          {"id": "10", "name": "example10"},
          {"id": "11", "name": "example11"},
          {"id": "12", "name": "example12"}
        ]
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

