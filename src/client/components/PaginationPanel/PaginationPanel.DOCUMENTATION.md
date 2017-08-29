### Synopsis

PaginationPanel react component

### Props Reference

| Name                           | Type                    | Description                                                       |
| ------------------------------ | :---------------------- | -----------------------------------------------------------       |
| count                          | number                  | The count number of results to paginate.                          |
| offset                         | number                  | The offset navigate                                               |
| onPaginate                     | func                    | Callback fired when current page number changes                   |
| max                            | number                  | The number of records to display per page, default 10. (optional) |
| style                          | object                  | CSS styles (optional)                                             |

### Code Example

```
<PaginationPanel
  max={ 5 }
  count={ 150 }
  offset={ 5 }
  onPaginate={(offset) => { console.log(offset) }}
/>
```

### Contributors

Alexey Sergeev, Dmitriy Sanko

### Component Name

PaginationPanel

### License

Licensed by © 2017 OpusCapita
