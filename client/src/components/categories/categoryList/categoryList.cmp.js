import React from 'react';
import { Link } from 'react-router';
import { getCategories } from '../../../actions/category.act';
import { connect }            from 'react-redux';

class CategoryList extends React.Component {

    constructor() {
        super();
        this.render = this.render.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
      this.props.getCategories();
    }

    render() {
      let categories = this.props.categories;


      if (!categories || !categories.size) {
        return (
          <div>Loading categories...</div>
        );
      }

      let html = [];

      categories.forEach((category) => {
        html.push(
          <Link to={{ pathname: '/places', query: { category: category.get('_id')} }} key={category.get('_id')}>
            {category.get('title')}&nbsp;|&nbsp;
          </Link>
        );
      });


      // let html = categories.map((comment) => {
      //     return (
      //     <span key={category.get('_id')>

      //     </span>
      //     );
      //   });


        return (
          <div>
            {html}
          </div>
        );
    }

}

function mapStateToProps(state) {
  return {
    categories: state.getIn(['categories', 'categories'])
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => dispatch(getCategories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
