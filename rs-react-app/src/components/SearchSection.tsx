import { Component } from 'react';
import type { ChangeEvent, SyntheticEvent } from 'react';
import './SearchSection.css';

interface SessionState {
  inputText: string;
}

interface SearchSectionProps {
    onSubmitToSearch: (text:string) => void;
}

class SearchSection extends Component <SearchSectionProps, SessionState>{
    constructor(props: SearchSectionProps){
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

    submitSearch = (evt: SyntheticEvent<HTMLFormElement>) => {
        evt.preventDefault();
        const text: string = this.state.inputText.trim();
        localStorage.setItem('search-text', text);
        this.props.onSubmitToSearch(text);
    }

    render() {
        return (
        <section className="search-section">
          <h2>Search</h2>
          <form onSubmit={this.submitSearch}>
            <input type="text" value = {this.state.inputText} onChange={this.handleInputChange}/>
            <button type="submit">Search!</button>
          </form>
        </section>
        )
    }
}

export default SearchSection;