import React from 'react';
import Dropzone from 'react-dropzone'

class Upload extends React.Component {

    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
        this._onDrop = this._onDrop.bind(this);

        this.state = {
            files: []
        };
    }

    _onDrop(newFiles) {
        console.log(5);
        let files = this.state.files.concat(newFiles)


        this.setState({
            files: files
        });
    }

    render() {

        let html = [];

        this.state.files.forEach((file) => {
            html.push(
                <div>
                    {file.name}
                </div>
            );
        }); 

        let style = {
            width: '100%',
            padding: '10px',
            borderWidth: 2,
            borderColor: '#999',
            borderStyle: 'dashed',
            borderRadius: 5,
            textAlign: 'center',
            marginBottom: '10px'    
        }

        let activeStyle = {
            borderColor: '#666'
        };        

        return (
            <div>
                <Dropzone onDrop={this._onDrop} style={style} activeStyle={activeStyle}>
                    <div>Drag files to upload or click to select them</div>
                </Dropzone>
                {html}
            </div>
        );
    }
}

export default Upload;