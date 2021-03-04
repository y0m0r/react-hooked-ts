import React, {useState} from "react";


type Props = {
    searchFunction: (keyword: string) => void
}

const Search: React.VFC<Props> = ({searchFunction}) => {
    const [searchValue, setSearchValue] = useState<string>("");

    const handleSearchInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }
    const resetInputField = () => {
        setSearchValue("")
    }
    const callSearchFunction = (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        searchFunction(searchValue);
        resetInputField();
    }

    return (
        <>
            <form className="search">
                <input value={searchValue}
                       onChange={handleSearchInputChanges}
                       type="text"
                />
            </form>
            <input onClick={callSearchFunction} type="submit" value="Search"/>
        </>
    )
}
export default Search