import { StyledTable, THead, TBody, TFoot, TH, TRBody, TRHead, TD } from './Table';

export const STable = ({ children, ...rest }) => {
  return <StyledTable {...rest}>{children}</StyledTable>;
};

STable.Head = ({ children, ...rest }) => {
  return <THead {...rest}>{children}</THead>;
};

STable.Body = ({ children, ...rest }) => {
  return <TBody {...rest}>{children}</TBody>;
};

STable.Foot = ({ children, ...rest }) => {
  return <TFoot {...rest}>{children}</TFoot>;
};

STable.TH = ({ children, ...rest }) => {
  return <TH {...rest}>{children}</TH>;
};

STable.TRBody = ({ children, ...rest }) => {
  return <TRBody {...rest}>{children}</TRBody>;
};

STable.TRHead = ({ children, ...rest }) => {
  return <TRHead {...rest}>{children}</TRHead>;
};

STable.TD = ({ children, ...rest }) => {
  return <TD {...rest}>{children}</TD>;
};