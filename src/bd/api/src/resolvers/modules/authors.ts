import { datatype } from "faker";
import type {ExistingAuthor} from "../../../.mesh";

const types = [
  "IATF 16949",
  "ISO 9001",
  "ISO TS 22163",
  "AS 9100",
  "Eco Management and Audit Scheme EMAS",
  "OHSAS 18001",
  "ISO 14001",
  "ISO 45001",
  "ISO 50001",
  "ISO IEC 27001",
  "EPAI",
  "CQI",
] as const;

function* generateAuthorNames(i: number): Generator<ExistingAuthor["name"]> {
  while (true) {
    yield `Author ${(i += 1)}`;
  }
}

function* generateAuthorTypes(): Generator<ExistingAuthor["type"]> {
  yield { id: datatype.uuid(), name: types[0], version: "2016" };
  yield { id: datatype.uuid(), name: types[1], version: "2015" };
  yield { id: datatype.uuid(), name: types[2], version: "2017" };
  yield { id: datatype.uuid(), name: types[3], version: "Rev D" };
  yield { id: datatype.uuid(), name: types[4], version: "Rev III" };
  yield { id: datatype.uuid(), name: types[5], version: "2007" };
  yield { id: datatype.uuid(), name: types[6], version: "2015" };
  yield { id: datatype.uuid(), name: types[7], version: "2018" };
  yield { id: datatype.uuid(), name: types[8], version: "2018" };
  yield { id: datatype.uuid(), name: types[9], version: "" };
  yield { id: datatype.uuid(), name: types[10], version: "1" };
  yield { id: datatype.uuid(), name: types[10], version: "2" };
  yield { id: datatype.uuid(), name: types[10], version: "3" };
  yield { id: datatype.uuid(), name: types[10], version: "4" };
  yield { id: datatype.uuid(), name: types[11], version: "9" };
  yield { id: datatype.uuid(), name: types[11], version: "11" };
  yield { id: datatype.uuid(), name: types[11], version: "12" };
  yield { id: datatype.uuid(), name: types[11], version: "15" };
  yield { id: datatype.uuid(), name: types[11], version: "17" };
  yield { id: datatype.uuid(), name: types[11], version: "23" };
}
function* generateRegistrationNumbers(
  i: number
): Generator<ExistingAuthor["registration_number"]> {
  while (true) {
    yield `registration number ${(i += 1)}`;
  }
}

function* generateCreatedAt(
  i: number
): Generator<ExistingAuthor["created_at"]> {
  while (true) {
    const date = new Date("2000-01-01");

    date.setDate(date.getDate() + i);
    i += 1;

    yield date;
  }
}

const name = generateAuthorNames(0);
const type = generateAuthorTypes();
const registrationNumber = generateRegistrationNumbers(0);
const createdAt = generateCreatedAt(0);

export const authors: ExistingAuthor[] = Array.from(Array(100).keys()).map(
  (item, key) => ({
    __typename: "ExistingAuthor",
    id: key === 0 ? "0" : datatype.uuid(),
    // type: type.next().value,
    name: name.next().value,
    // registration_number: registrationNumber.next().value,
    // created_at: createdAt.next().value,
  })
);
