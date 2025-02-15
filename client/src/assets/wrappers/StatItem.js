import styled from "styled-components";

export const Wrapper = styled.article`
    padding: 1rem 2rem;
    background: var(--background-secondary-color);
    border-radius: var(--border-radius);
    border-bottom: 5px solid ${prop => prop.color};
    header{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .count{
        display: block;
        font-weight: 700;
        font-size: 50px;
        color: ${prop => prop.color};
        line-height: 2;
    }
    .title{
        margin: 0;
        text-transform: capitalize;
        letter-spacing: var(--letter-spacing);
        text-align: left;
        margin-top: 0.5rem;
        font-size: 1.25rem;
    }
    .icon{
        width: 70px;
        height: 60px;
        background: ${prop => prop.bcg};
        border-radius: var(--border-radius);
        display: flex;
        align-items: center;
        justify-content: center;
        svg{
            font-size: 2rem;
            color: ${prop => prop.color}
        }
    }

`