import styled from "styled-components";

export const Wrapper = styled.section`
    border-radius: var(--border-radius);
    width: 100%;
    background: var(--background-secondary-color);
    padding: 2rem 2rem 2rem;
    .form-title{
        margin-bottom: 1rem;
        text-align: center;
    }
    .form{
        margin: 0;
        border-radius: 0;
        box-shadow: none;
        padding: 0;
        max-width: 100%;
        width: 100%;
    }

    .form-row{
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        width: 80%;
        max-width: 800px;
    }

    .form-center{
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .form-btn{
        align-self: center;
        width: max-content;
        min-width: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

`