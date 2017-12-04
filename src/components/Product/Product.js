import React from "react";
import { Form, Input, Select, Popover, Button, Card, Carousel } from "antd";
import { Row, Col } from "react-flexbox-grid";
import { Link } from "found";
import { createFragmentContainer, commitMutation, graphql } from "react-relay";
import "./product.css";

const Option = Select.Option;
const FormItem = Form.Item;

const mutation = graphql`
  mutation ProductMutation($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
        lineItems(first: 1) {
          edges {
            node {
              title
              quantity
            }
          }
        }
      }
    }
  }
`;

function createCheckout(environment) {
  const variables = {
    input: {}
  };

  commitMutation(environment, {
    mutation,
    variables,
    onCompleted: (response, errors) => {
      console.log("Response received from server.");
    },
    onError: err => console.error(err)
  });
}

class Product extends React.Component {
  onSubmit = e => {
    e.preventDefault();

    const { relay: { environment }, form } = this.props;

    const chart = JSON.parse(window.localStorage.getItem("cart")) || [];

    form.validateFields((err, values) => {
      if (!err) {
        chart.push(values.variant);

        window.localStorage.setItem("cart", JSON.stringify(chart));
      }
    });
  };

  render() {
    const {
      product: { id, title, images, description, variants },
      form
    } = this.props;
    const { getFieldDecorator } = form;
    const inventory = variants.edges[0].node;
    const price = inventory.price;

    return (
      <Card noHovering>
        <Row>
          <Col xs={12} md={8}>
            <Carousel effect="fade">
              {images.edges.map(({ node }) => (
                <div
                  key={node.id}
                  className="carousel__slide--fullscreen"
                  style={{ backgroundImage: `url(${node.src})` }}
                />
              ))}
            </Carousel>
          </Col>
          <Col xs={12} md={4}>
            <Link to={`/products/${id}`}>
              <h3>
                {title} &#183; ${price}
              </h3>
            </Link>
            <p>{description}</p>
            <div className="card__footer">
              <div className="card__footer--left">
                <Form>
                  {getFieldDecorator("id", {})(
                    <Input type="hidden" value={inventory.id} />
                  )}
                  <FormItem>
                    {getFieldDecorator("variant", {
                      initialValue: "",
                      rules: [
                        {
                          required: true,
                          message: "Please input your username!"
                        }
                      ]
                    })(
                      <Select>
                        <Option key="pick_size" value="">
                          Pick size
                        </Option>
                        {variants.edges.map(
                          ({ node: { id, selectedOptions: [{ value }] } }) => (
                            <Option key={value} value={id}>
                              {value}
                            </Option>
                          )
                        )}
                      </Select>
                    )}
                  </FormItem>
                </Form>
              </div>
              <div className="card__footer--right">
                <ul className="list--horizontal">
                  <li>
                    <Button shape="circle">
                      <a
                        target="_blank"
                        href={`https://facebook.com/sharer.php?u=https://www.espisonline.com/products/${id}`}
                        tite={title}
                      >
                        <i className="fa fa-facebook" />
                      </a>
                    </Button>
                  </li>
                  <li>
                    <Button shape="circle">
                      <a
                        href={`https://twitter.com/share?text=Baby%${title}&url=https://www.espisonline.com/products/${id}`}
                        title={title}
                      >
                        <i className="fa fa-twitter" />
                      </a>
                    </Button>
                  </li>
                  <li>
                    <Button
                      shape="circle"
                      icon="plus"
                      onClick={this.onSubmit}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default createFragmentContainer(
  Form.create({})(Product),
  graphql`
    fragment Product_product on Product {
      id
      title
      description
      variants(first: 20) {
        edges {
          node {
            id
            availableForSale
            compareAtPrice
            price
            selectedOptions {
              name
              value
            }
          }
        }
      }
      images(first: 5) {
        edges {
          node {
            id
            src
          }
        }
      }
    }
  `
);
