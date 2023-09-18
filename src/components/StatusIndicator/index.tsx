import styled from "styled-components";

// const pulseActive = keyframes`
//   from {
//     background-color: #3eb73e;
//   }

//   to {
//     background-color: #00ff00;
//   }
// `;

// const pulseInActive = keyframes`
//   from {
//     background-color: #f03535;
//   }

//   to {
//     background-color: #f03535;
//   }
// `;

interface IStatusIndicator {
  isActive: boolean;
}

const StatusIndicator = styled.div<IStatusIndicator>`
  height: 6px;
  width: 6px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  background-color: ${({ isActive }) => (isActive ? "#50d150" : "#f03535")};
  margin-right: 4px;
  margin-left: 14px;
  transition: background 1s ease-in-out;
`;

//  animation: ${({ isActive }) => `${isActive ? pulseActive : pulseInActive} 2s alternate infinite`};


export default StatusIndicator;
