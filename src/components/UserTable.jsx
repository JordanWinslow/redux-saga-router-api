import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

/**********BEGIN STYLING**********/
const Table = styled.table`
  border-collapse: collapse;
  a {
    display: contents;
    text-decoration: none;
  }
`;
const TH = styled.th`
  font-family: Arial, sans-serif;
  font-size: 17px;
  font-weight: normal;
  letter-spacing: 1px;
  padding: 10px 20px;
  word-break: normal;
  color: #fdf6e3;
  background-color: #fe4365;
`;
const TD = styled.td`
  font-family: Arial, sans-serif;
  font-size: 14px;
  padding: 20px;
  word-break: normal;
  border-color: #c44d58;
  color: #002b36;
  transition: 0.3s ease-in-out;
`;
const TR = styled.tr`
  cursor: pointer;
  background-color: #f9cdad;
  transition: 0.3s ease-in-out;
  :hover {
    background-color: #fe4365;
    td {
      color: #fdf6e3;
    }
  }
`;
/**********END STYLING**********/
const UserTable = ({ history, users, requestUsers, requestPosts }) => {
  useEffect(() => {
    requestUsers();
    requestPosts();
    console.log("UserTable Component Rendered.");
  }, []);

  return (
    <Table>
      <tbody>
        <TR>
          <TH>ID</TH>
          <TH>NAME</TH>
          <TH>USERNAME</TH>
          <TH>EMAIL</TH>
          <TH>PHONE</TH>
          <TH>WEBSITE</TH>
        </TR>
      </tbody>
      {users.map(user => {
        return (
          <tbody key={user.id}>
            <TR onClick={() => history.push(`/user/${user.id}`)}>
              <TD>{user.id}</TD>
              <TD>{user.name}</TD>
              <TD>{user.username}</TD>
              <TD>{user.email}</TD>
              <TD>{user.phone}</TD>
              <TD>{user.website}</TD>
            </TR>
          </tbody>
        );
      })}
    </Table>
  );
};

const mapStateToProps = state => {
  return { users: state.users };
};
const mapDispatchToProps = dispatch => {
  return {
    requestUsers: () => {
      dispatch({ type: "REQUEST_USERS" });
    },
    requestPosts: () => {
      dispatch({ type: "REQUEST_POSTS" });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserTable);
