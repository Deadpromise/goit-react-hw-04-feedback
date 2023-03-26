import styled from '@emotion/styled';

export const Button = styled.button`
    background-color: white;
    outline: none;
    border-radius: 4px;
    font-size: 20px;

    &:active {
        background-color: lightblue;
    }

    &:not(:first-of-type) {
        margin-left: 20px;
    }

`;