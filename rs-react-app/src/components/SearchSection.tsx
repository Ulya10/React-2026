import { Component, type ChangeEvent} from 'react';
import './SearchSection.css';

interface SessionState {
  inputText: string;
}

class SearchSection extends Component <object, SessionState>{
    constructor(props: object){
        super(props);
        this.state = {
            inputText : '',
        }
    }

    componentDidMount(): void {
        const savedText = localStorage.getItem('search-text');
        if(savedText){
            this.setState({
                inputText : savedText
            })
        }
    }

    handleInputChange = (evt:ChangeEvent<HTMLInputElement>):void => {
        this.setState({
            inputText : evt.target.value
        });
    }

    render() {
        return (
        <section className="search-section">
          <h2>Search</h2>
          <form>
            <input type="text" value = {this.state.inputText} onChange={this.handleInputChange}/>
            <button type="submit">Search!</button>
          </form>
        </section>
        )
    }
}

export default SearchSection;