import React, {ChangeEvent, Dispatch, FormEvent, MouseEventHandler, MouseEvent} from "react";
import {Grid} from "@mui/material";
import {SearchField} from "../../common/TextField/SearchField";

interface SearchFormProps {
    query: string;
    setQuery:  Dispatch<React.SetStateAction<string>>;
    handleSubmit:  MouseEventHandler<HTMLButtonElement>;
}

export const SearchForm = (props : SearchFormProps) => {
    const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.setQuery(event.target.value);
    };

    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.handleSubmit(event as unknown as MouseEvent<HTMLButtonElement>);
    };

    return (
        <Grid item>
            <form onSubmit={handleFormSubmit}>
                <Grid item>
                    <SearchField
                        value={props.query}
                        placeholder='Введіть назву теми'
                        onChange={handleQueryChange}
                        handleSubmit={props.handleSubmit}
                    />
                </Grid>
            </form>
        </Grid>
    );
}