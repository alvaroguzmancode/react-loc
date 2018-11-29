/**
 *
 * SideBar
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Button, Header, Icon, Image, Menu, Segment, Sidebar, Container } from 'semantic-ui-react';

/* eslint-disable react/prefer-stateless-function */
class SideBar extends React.Component {
  constructor(props){
    super(props);
    console.log(props);
  }

  state = { visible: false }

  handleMenuClick = () => this.setState({ visible: !this.state.visible })

  render() {
    const { visible } = this.state
    return (
      <div style={{width: "100%",height: "100%", borderRadius: 0}}>

        <Menu style={{marginBottom: -15}}>
          <Menu.Item name='browse' onClick={this.handleMenuClick}>
            Menu
          </Menu.Item>
        </Menu>

        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation='push'
            icon='labeled'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={visible}
            width='thin'
          >
            <Menu.Item as='a' href='/'>
              <Icon name='home' />
              Dashboard
            </Menu.Item>
            <Menu.Item as='a'>Estados</Menu.Item>
            <Menu.Item as='a'>Municipios</Menu.Item>
            <Menu.Item as='a'>Colonias</Menu.Item>
            <Menu.Item as='a'>Sucursal</Menu.Item>
            <Menu.Item as='a'>Consultorio</Menu.Item>
            
          </Sidebar>

          <Sidebar.Pusher style={{borderRadius: 0}}>
            <div style={{widht: "100%", height:15}} />
            <Container>
              { this.props.childrenp }
            </Container>
          </Sidebar.Pusher>

        </Sidebar.Pushable>
      </div>
    );
  }
}

SideBar.propTypes = {};

export default SideBar;
