import React, { Component } from 'react';
import Downshift from 'downshift';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.lang = [{ name: 'python' }, { name: 'text/x-c++src' }];

    this.state = {
      selectedLang: ''
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(selectedLang) {
    this.setState({ selectedLang: selectedLang.name }, () => {
      this.props.sendData(this.state.selectedLang);
    });
  }

  render() {
    return (
      <Downshift
        onChange={this.onChange}
        selectedItem={this.state.selectedLang}
        itemToString={lang => (lang ? lang.name : '')}
      >
        {({
          isOpen,
          getToggleButtonProps,
          getItemProps,
          highlightedIndex,
          selectedItem: dsSelectedItem,
          getLabelProps
        }) => (
          <div>
            <label
              style={{ marginTop: '1rem', display: 'block' }}
              {...getLabelProps()}
            />{' '}
            <br />
            <button className="dropdown-button" {...getToggleButtonProps()}>
              {this.state.selectedLang !== ''
                ? this.state.selectedLang
                : 'Select a language ...'}
            </button>
            <div style={{ position: 'relative' }}>
              {isOpen ? (
                <div className="downshift-dropdown">
                  {this.lang.map((item, index) => (
                    <div
                      className="dropdown-item"
                      {...getItemProps({ key: index, index, item })}
                      style={{
                        backgroundColor:
                          highlightedIndex === index ? 'lightgray' : 'white',
                        fontWeight: dsSelectedItem === item ? 'bold' : 'normal'
                      }}
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        )}
      </Downshift>
    );
  }
}

export default Dropdown;
