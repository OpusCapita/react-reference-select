import { PropTypes } from 'react';

export default {

  /**
   * Title of the reference search dialog
   */
  title: PropTypes.string.isRequired,

  /**
   * Array of search columns, where object is:
   *
   * @name - field name (f.e. customerId)
   * @label - title of field name (usually translation of the field name f.e. 'Customer Id')
   * @inputComponent - instance of the react component that will be render instead of default input
   * The component should support the next props:
   * *onChange - function that should be called on in input change
   * *value - input value
   * *ref - ref should be pointed to target input to provide focus
   * *id - id of the input component to provide correct label work
   *
   * The component should provide method focus that targets real input, it can look like:
   * focus() {
   *   let element = this.refs[this.props.id];
   *   if (element) {
   *     setTimeout(() => element.focus(), 300);
   *   }
   * }
   *
   */
  searchFields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    inputComponent: PropTypes.func
  })).isRequired,

   /**
    * Array of search result columns, where object is:
    *
    * @name - field name (f.e. customerId)
    * @label - title of field name (usually translation of the field name f.e. 'Customer Id')
    * @sortable - true/false
    * @view - function that is if defined will be used to render field value within result table cell,
    * function accepts object that has the following properties:
    *   @object - current search result item
    *   @handleClick - callback function without parameters that can be used it you would generate a
    *     link that is used for item selection
    *   Example of 'view' function implementation that describes default behavior:
    *   ({object, handleClick}) => {
    *     <button type="button" className="btn btn-link" onClick={handleClick} style={{padding: 0}}>
    *       {object['id']}
    *     </button>
    *   }
    */
  resultFields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    sortable: PropTypes.bool,
    view: PropTypes.func
  })).isRequired
};
