import styled from 'styled-components';
import { darken } from 'polished';

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;

  li {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 5px;
    padding: 20px;

    img {
      align-self: center;
      max-width: 250px;
    }

    > strong {
      color: #333;
      margin-top: 5px;
      font-size: 16px;
      line-height: 20px;
    }

    > span {
      font-size: 21px;
      font-weight: bold;
      margin: 5px 0 20px;
    }

    button {
      background: #7159c1;
      color: #fff;
      border: 0;
      border-radius: 5px;
      overflow: hidden;
      transition: background 0.3s;
      display: flex;
      align-items: center;
      margin-top: auto;

      &:hover {
        background: ${darken(0.1, '#7159c1')};
      }

      div {
        display: flex;
        align-items: center;
        padding: 12px;
        background: rgba(0, 0, 0, 0.1);

        svg {
          margin-right: 5px;
        }
      }
      span {
        flex: 1;
        text-transform: uppercase;
        font-weight: bold;
        text-align: center;
      }
    }
  }
`;
