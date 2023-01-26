// ES6 class components

class ProductList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };
    this.handleProductUpvote = this.handleProductUpvote.bind(this);
  }
  componentDidMount() {
    this.setState({ products: Seed.products });
  }
  handleProductUpvote(productId) {
    // first we use map to traverse the products array 
    // & map returns a new array, instead of modifying the array this.state.products
    const nextProducts = this.state.products.map((product) => {
      // check if the current product matches productId
      if (product.id === productId) {
        // it does, so we create a new object, copying over the properties from the original product object
        return Object.assign({}, product,{
          // overwrite the amount of votes and set it to the incremented vote count
          votes: product.votes + 1,
        });
      } else {
        // it doesn't, just return the product unmodified
        return product;
      }
    });
    // setState to update the state
    this.setState({
      products: nextProducts,
    });
  }

  render() { // the only required method for a react component
    const products = this.state.products.sort((a, b) => (
      b.votes - a.votes
    ));
    
    const productComponents = products.map((product) => 
      <Product 
        key={'product-' + product.id}
        id={product.id}
        title={product.title}
        description={product.description}
        url={product.url}
        votes={product.votes}
        submitterAvatarUrl={product.submitterAvatarUrl}
        productImageUrl={product.productImageUrl}
        onVote={this.handleProductUpvote}
      /> 
    );
    return (
      <div className= "ui unstackable items">
        {productComponents}
      </div>
    );
  }
}

class Product extends React.Component {
  constructor(props) {
    super(props);

    this.handleUpvote = this.handleUpvote.bind(this);
  }

  handleUpvote() {
    this.props.onVote(this.props.id);
  }
  
  render() {
    return (
      <div className="item">
        <div className="image">
          <img src={this.props.productImageUrl}/>
        </div>
        <div className="middle aligned content">
          <div className="header">
            <a onClick={this.handleUpvote}>
              <i className="large caret up icon" />
            </a>
            {this.props.votes}
          </div>
          <div className="description">
            <a href={this.props.url}>
              {this.props.title}
            </a>
            <p>
              {this.props.description}
            </p>
          </div>
          <div className="extra">
            <span>Submitted by:</span>
            <img className="ui avatar image" src={this.props.submitterAvatarUrl}/>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <ProductList />,
  document.getElementById('content')
);

// ReactDOM.render([what], [where])