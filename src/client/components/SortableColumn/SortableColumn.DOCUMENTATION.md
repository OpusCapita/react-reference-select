### Synopsis

SortableColumn react component

### Code Example

```
<SortableColumn
  title="Sortable column"
  test="id"
  order="asc"
  defaultOrder="asc"
  sort="id"
  onSort={(test, order) => { console.log(test, order) }}
/>
```

### Props Reference

| Name                          | Type                  | Description                                                |
| ------------------------------|:----------------------| -----------------------------------------------------------|
| title | string | Column name |
| test | string | Object field, required for multiple sortable columns support. |
| order | string | Order for objects sorting by field ('asc', 'desc'). |
| defaultOrder | string | Default order ('asc') is used when `order` property is not specified. |
| sort | string | Object field which is used in column for sorting. |
| onSort | func | Callback fired when column sorting initiates. |

### Contributors
Alexey Sergeev, Dmitriy Sanko

### Component Name

SortableColumn

### Tags

ReactReferenceSelect

### License

Licensed by © 2016 OpusCapita 

