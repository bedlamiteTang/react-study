var headers = [
  1, "Author", "Language", "Published", "Sales"
];
var data = [
  ["The Lord of the Rings", "J. R. R. Tolkien",
    "English", "1954–1955", "150 million"],
  ["Le Petit Prince (The Little Prince)", "Antoine de Saint-Exupéry",
    "French", "1943", "140 million"],
  ["Harry Potter and the Philosopher's Stone", "J. K. Rowling",
    "English", "1997", "107 million"],
  ["And Then There Were None", "Agatha Christie",
    "English", "1939", "100 million"],
  ["Dream of the Red Chamber", "Cao Xueqin",
    "Chinese", "1754–1791", "100 million"],
  ["The Hobbit", "J. R. R. Tolkien",
    "English", "1937", "100 million"],
  ["She: A History of Adventure", "H. Rider Haggard",
    "English", "1887", "100 million"],
];

class Excel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: props.initialData,
      sortby: null,
      descending: false,
      edit: null
    };

    this._sort = this._sort.bind(this);
    this._showEditor = this._showEditor.bind(this);
    this._save = this._save.bind(this);
  }

  _sort(e) {
    var column = e.target.cellIndex;
    var descending = this.state.sortby === column && !this.state.descending;
    var data = this.state.data.slice();

    data.sort(function (a, b) {
      return descending
        ? (a[column] < b[column] ? 1 : -1)
        : (a[column] > b[column] ? 1 : -1);
    });

    this.setState({
      data: data,
      sortby: column,
      descending: descending
    });
  }

  _showEditor(e) {
    this.setState({
      edit: {
        row: parseInt(e.target.dataset.row, 10),
        cell: e.target.cellIndex,
      }
    });
  }

  _save(e) {
    e.preventDefault();
    // 进行保存
    var input = e.target.firstChild;
    var data = this.state.data.slice();
    data[this.state.edit.row][this.state.edit.cell] = input.value;
    this.setState({
      edit: null,
      data: data,
    });
  }

  render() {
    return (
      React.createElement('table', null,
        React.createElement('thead', { onClick: this._sort },
          React.createElement('tr', null,
            this.props.headers.map((val, key) => {
              if (this.state.sortby === key) {
                val += this.state.descending ? ' \u2193' : ' \u2191'
              }
              return React.createElement('th', { key }, val)
            })
          )
        ),
        React.createElement('tbody', { onDoubleClick: this._showEditor },
          this.state.data.map((row, rowidx) => {
            return (
              React.createElement('tr', { key: rowidx },
                row.map((cell, idx) => {
                  var edit = this.state.edit;
                  var content = cell;

                  if (edit && edit.row === rowidx && edit.cell === idx) {
                    content = React.createElement('form', { onSubmit: this._save },
                      React.createElement('input', {
                        type: 'text',
                        defaultValue: content   // 非受控组件；如果使用value将变成受控组件，value必须通过setState修改，如果value指向一个常量将不能修改（eg: value: 'test'）。
                      })
                    );
                  }
                  return React.createElement('td', { key: idx, 'data-row': rowidx }, content);
                })
              )
            );
          })
        )
      )
    )
  }
}

// production 模式下不校验propTypes
Excel.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.string
  ),
  initialData: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.string
    )
  )
}

ReactDOM.render(
  React.createElement(Excel, {
    headers: headers,
    initialData: data
  }),
  document.getElementById('root')
)