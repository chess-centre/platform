import API from "@aws-amplify/api";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAuthState } from "../../context/Auth";
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { PlusIcon } from '@heroicons/react/solid'
import { Combobox } from '@headlessui/react';
import { classNames } from "../../utils/Classes";

const listMembers = /* GraphQL */ `
  query ListMembers(
    $filter: ModelMemberFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMembers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        fideId
        ecfId
        email
        username
        name
        ecfRating
        ecfRapid
        ecfMembership
        estimatedRating
        club
        stripeFriendlyProductName
      }
    }
  }
`;

export default function Admin() {
  const { id } = useParams();
  const { user } = useAuthState();
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdatingECF, setIsUpdatingECF] = useState(false);
  const [members, setMembers] = useState([]);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [ecfId, setECFId] = useState(null);

  useEffect(() => {

    document.title = "The Chess Centre | Admin";

    async function fetchStatus() {
      setIsLoading(true);
      const {
        data: {
          listMembers: { items: playersList },
        },
      } = await API.graphql({
        query: listMembers,
        variables: { limit: 500 },
        authMode: "AWS_IAM",
      });
      if (playersList) {
        setMembers(playersList.filter(m => !m.ecfId));
      }
      setIsLoading(false);
    }
    fetchStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);


  const updateECFIdForMember = async () => {
    setIsUpdatingECF(true);
    console.log(selectedMemberId, ecfId);

    if (selectedMemberId && ecfId) {
      const response = await API.put("admin", "/addECFId", {
        body: {
          ecfId,
          memberId: selectedMemberId,
          adminId: id
        }
      }).catch(error => {
        console.log("Error", error);
        setIsUpdatingECF(false);
      });
      setIsUpdatingECF(false);
      console.log(response);
    }
  }

  const handleECFIdUpdate = id => {
    setECFId(id);
  }


  return (
    <>
      <h1 className="relative mt-6 mb-2 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        <i className="fad fa-tools text-sky-600"></i> Admin
        <div className="inline-flex align-top top-2 ml-2">
        </div>
        {isLoading && (
          <div className="absolute text-sky-500 mt-2 align-middle ml-2 text-sm inline-flex">
            <i className="fal fa-spinner-third fa-spin fa-fw"></i>
          </div>
        )}
      </h1>
      <div className="pb-5 border-b border-gray-200 dark:border-gray-700">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <p className="ml-2 mt-1 text-sm text-left text-gray-500 dark:text-gray-400">
            Utility functions to help maintain our site!
          </p>
        </div>
      </div>
      <div>
        <div className="rounded-md bg-sky-100 p-4 mb-2 mt-2 border">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-sky-600">... with great power comes great responsibility</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1">
        <div className="shadow rounded-lg border bg-white grid gap-2 xl:gap-4 mb-8 md:grid-cols-2 mt-2 px-4 py-6">
          <div>
            {members.length > 0 && <MemberSearch members={members} setSelectedMemberId={setSelectedMemberId} />}
            <div className="text-left">
              {isUpdatingECF && <div className="text-gray-300 italic text-sm mt-2">
                <i className="fas fa-spinner-third fa-spin fa-fw text-sky-500"></i>{" "}
                Update member ...
              </div>}
            </div>
          </div>

          <div className="space-y-1 mt-4 sm:mt-0">
            <label htmlFor="add-ecf-id" className="block text-sm font-medium text-gray-700">
              Add ECF ID
            </label>
            <p id="add-ecf-id" className="sr-only">
              ECF Rating ID
            </p>
            <div className="flex">
              <div className="flex-grow">
                <input
                  onChange={e => handleECFIdUpdate(e.target.value)}
                  type="text"
                  name="add-ecf-id"
                  id="add-ecf-id"
                  className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
                  placeholder="ECF Rating ID"
                  aria-describedby="add-ecf-id"
                />
              </div>
              <span className="ml-3">
                <button
                  onClick={() => updateECFIdForMember()}
                  type="button"
                  className="bg-white inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                  <PlusIcon className="-ml-2 mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span>Add</span>
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

function MemberSearch({ members, setSelectedMemberId }) {
  const [query, setQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState();

  const filteskyMembers =
    query === ''
      ? members
      : members.filter((member) => {
        return member.name.toLowerCase().includes(query.toLowerCase())
      });

  const handleSelectedMember = member => {
    setSelectedMember(member);
    setSelectedMemberId(member.id);
  };

  return (
    <Combobox as="div" value={selectedMember} onChange={handleSelectedMember}>
      <Combobox.Label className="block text-sm font-medium text-gray-700">Select Member</Combobox.Label>
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(member) => member.name}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {filteskyMembers.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteskyMembers.map((member) => (
              <Combobox.Option
                key={member.id}
                value={member}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-sky-600 text-white' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className="flex">
                      <span className={classNames('truncate', selected && 'font-semibold')}>{member.name}</span>
                      <span
                        className={classNames(
                          'ml-2 truncate text-gray-500',
                          active ? 'text-sky-200' : 'text-gray-500'
                        )}
                      >
                        {member.email}
                      </span>
                    </div>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-sky-600'
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  )
}
