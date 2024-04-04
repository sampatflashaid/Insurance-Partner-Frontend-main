import styled from 'styled-components';

const DetailList = styled.ul`
  list-style: none;
  padding: 10px;
  text-align: left;
  display: flex;
  flex-direction: column;
  /* margin: 0 auto; */
  margin-bottom: auto;
  /* background-color: #ff925f; */
`;
const DetailItem = styled.li`
  margin-bottom: 8px;
`;
const DetailItemNest = styled.li`
  margin-bottom: 8px;
  /* list-style-type: &minus; */
  margin-left: 10px;
`;
const DetailKey = styled.strong`
  /* color: #555; */
  color: '#00000';
`;
const DetailKeyNest = styled.strong`
  /* color: #555; */
  color: '#00000';
  margin: 0;
`;
const NestedDetailList = styled(DetailList)`
  margin-left: 20px;
`;
const DetailValue = styled.span`
  color: #333; /* Detail value color */
`;

function DisplayObject({ obj, skip }) {
  if (Object.keys(obj).length === 0) return <p>No data found</p>;

  // Sort the object entries by key
  const sortedEntries = Object.entries(obj).sort(([keyA], [keyB]) =>
    keyA.localeCompare(keyB)
  );

  return (
    <DetailList>
      {sortedEntries.map(([key, value]) => {
        if (skip && skip.includes(key)) return null;
        return (
          <DetailItem key={key}>
            <DetailKey>{key}:</DetailKey>{' '}
            {typeof value === 'object' ? (
              <NestedDetailList>{renderNestedObject(value)}</NestedDetailList>
            ) : (
              <DetailValue>{value}</DetailValue>
            )}
          </DetailItem>
        );
      })}
    </DetailList>
  );
}

const renderNestedObject = (obj) => {
  return Object.entries(obj).map(([nestedKey, nestedValue]) => (
    <DetailItemNest key={nestedKey}>
      <em>&minus; </em>
      <DetailKeyNest>{nestedKey}:</DetailKeyNest>{' '}
      <DetailValue>{nestedValue}</DetailValue>
    </DetailItemNest>
  ));
};
export default DisplayObject;
