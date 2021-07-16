import React from 'react'

import axios from 'axios'
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import Autocomplete, {createFilterOptions} from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

class AutoCompleteAddress extends React.PureComponent {
    state = {
        results: [],
        // searchQuery: ''
    }

    _getSearchResult = e => {
        // this.setState({ searchQuery: e.target.value })
        
      if(e.target.value) {
        this.isBangla(e.target.value)       
        }
        else {
            console.log('EMPTY RESULTS')
            this.setState({
                results: []
            })
        }
      }

    isBangla = (str) => {
        var emailCheck = /^[a-zA-Z]*$/;
        if(emailCheck.test(str)){
          console.log("**Its eng");
        }
        else{
            axios.get(`${BASE_URL}?`, {
                params: {
                    q: str
                }
            })
                .then(res => {
                    const response = res.data.places
                    // console.log(response);
                    const {isEn} = this.state
                    const results = response.map(res => {
                        return {
                            PostInfo: res.post_code_full_bn,
                            district: res.post_zilla_bn ? res.post_zilla_bn : '',
                            postcode_en: res.post_code_bn ? res.post_code_bn : '',
                            postoffice_bn: res.post_office_bn ? res.post_office_bn : '',
                            sub_district_bn: res.post_upzilla_bn ? res.post_upzilla_bn : ''
                        }
                    })
                    this.setState({ results })
                    // console.log(results);
                })
                .catch(err => console.error(err))
        //   console.log("Input is bangla or number detected");
        }
      }

    render() {
        const { results } = this.state
        const { selectAddress, something } = this.props
        // console.log(results);
        return (
            <Box margin='4rem'>
             
                <Autocomplete
                    id='test'
                    size = 'small'
                    onChange={(e, value) => selectAddress(e, value)}
                    options={results && results.length > 0 ? results : []}
                    getOptionLabel={option => option.PostInfo}
                    filterOptions={(options, state) => options}
                    clearOnBlur={false}
                    // freeSolo={true}
                    autoHighlight
                    clearOnEscape
                    ListboxProps={
                        {
                          style:{
                              maxHeight: '400px',
                          }
                        }
                      }
                    renderInput={params =>
                        <TextField
                            placeholder="Search Post Office"
                            {...params}
                            fullWidth
                            variant='outlined'
                            margin='dense'
                            size='small'
                            // value={ this.state.searchQuery }
                            onChange={this._getSearchResult}
                            
                        />
                    }
                    // highlights
                    renderOption={(option, { inputValue }) => {
                        // console.log('option', option)
                        // console.log('inputValue', inputValue)
                        const matches = match(option.PostInfo, inputValue);
                        const parts = parse(option.PostInfo, matches);
                        
                        return (
                            <Box>
                               {parts.map((part, index) => (
                                            <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                                {part.text}
                                            </span>
                                        ))}
                            </Box>
                        );
                      }}
                />
                
            </Box>
        )
    }
}

const filterOptions = createFilterOptions({
    stringify: option => option.PostInfo + option.postcode_en + option.postoffice_bn,
})

const BASE_URL = 'http://elastic.barikoi.com/ps/search/postcode'

export default AutoCompleteAddress