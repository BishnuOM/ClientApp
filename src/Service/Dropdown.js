import React, { useEffect, useState, useRef } from "react";

const Icon = () => {
    return (
        <svg height="30" width="30" viewBox="0 0 20 20">
            <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
        </svg>
    );
};

const Dropdown = ({ placeHolder, options, isSearchable,selectedItem, onChangeItem,comeFrom }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [clickSearchInput, setClickSearchInput] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const [isEnterMouse, setIsEnterMouse] = useState(false);

    const searchRef = useRef();
    if (comeFrom == "RINGMEMBER") {
        selectedItem.id = selectedItem.roleId;
        selectedItem.name = selectedItem.roleName;
    }

    useEffect(() => {
        if (!clickSearchInput) {
            const handler = () => setShowMenu(false);
            window.addEventListener("click", handler);
            return () => {
                window.removeEventListener("click", handler);
            };
        }
        else {
            setClickSearchInput(false);
        }
    });

    useEffect(() => {
        setSearchValue("");
        if (showMenu && searchRef.current) {
            searchRef.current.focus();
        }
    }, [showMenu]);

    const handleInputClick = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    const handleSearchInputClick = (e) => {
        e.stopPropagation();
        setClickSearchInput(true);
    };

    const getDisplay = () => {
        if (selectedValue) {
            return selectedValue.name;
        }
        else if (selectedItem && selectedItem.name) {
            setSelectedValue(selectedItem);
            return selectedItem.name;
        }
        return placeHolder;
    };

    const onItemClick = (option) => {
        setSelectedValue(option);
        onChangeItem(option);
    };

    const isSelected = (option) => {
        if (selectedValue) {
            return false;
        }
        return selectedValue.id == option.id
    };

    const onSearch = (e) => {
        setSearchValue(e.target.value);
    };
    const getOptions = () => {
        if (!searchValue) {
            return options;
        }
        return options.filter((option) => option.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0);
    };

    const handleDropdownBackground = (state, option) => {
        setIsEnterMouse((state == true && selectedValue.id != option.id) ? true : false);
    };

    const getClass = (option) => {
        var cusClass="custom-dropdown-item";
        if (selectedValue.id == option.id) {
            cusClass = cusClass +" dl-selected-item";
        }
        if (isEnterMouse) {
            cusClass = cusClass +" dl-mouse-over-item";
        }
        return cusClass
    };

    return (
        <div className="custom-dropdown-container">
            <div className="custom-dropdown-input" onClick={handleInputClick}>
                <div className="custom-dropdown-selected-value">{getDisplay()}</div>
                <div className="custom-dropdown-tools">
                    <div className="custom-dropdown-tool">
                        {/*<Icon />*/}
                        <i style={{ fontSize: "30px" }} class="bi bi-chevron-down"></i>
                    </div>
                </div>
            </div>
            {showMenu && (
                <div className="custom-dropdown-menu">
                    {isSearchable && (
                        <div className="search-box">
                            <input onClick={handleSearchInputClick} onChange={onSearch} value={searchValue} ref={searchRef} />
                        </div>
                    )}

                    {getOptions().map((obj, ind) => {
                        return (<div
                            className={getClass(obj)} onClick={() => (!selectedValue || selectedValue.id != obj.id) && onItemClick(obj)
                    } key = { ind + 1}>{obj.name}</div>)
                    })}
                </div>
            )}
        </div>
    );
};

export default Dropdown;