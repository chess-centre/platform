import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { Link } from "react-router-dom";

import { ChessInfo, AccountInfo } from "./sections";
import { useAuthState } from "../../../context/Auth";

const getMember = /* GraphQL */ `
  query GetMember($id: ID!) {
    getMember(id: $id) {
      id
      about
      fideId
      ecfId
      username
      name
      email
      eventsByEmail
      promoByEmail
      eventsByText
      promoByText
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      stripeCustomerId
      stripeCurrentPeriodEnd
      stripePriceId
      stripeProductId
      entries {
        items {
          id
          eventId
          memberId
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          member {
            id
            about
            fideId
            ecfId
            username
            name
            email
            eventsByEmail
            promoByEmail
            eventsByText
            promoByText
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            stripeCustomerId
            stripeCurrentPeriodEnd
            stripePriceId
            stripeProductId
            entries {
              nextToken
              startedAt
            }
          }
          event {
            id
            name
            description
            rounds
            time
            startDate
            endDate
            maxEntries
            entryCount
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            type {
              id
              name
              description
              url
              color
              time
              maxEntries
              timeControl
              eventType
              defaultPrice
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
              stripePriceId
            }
            entries {
              nextToken
              startedAt
            }
          }
        }
        nextToken
        startedAt
      }
    }
  }
`;

function Profile() {
  const { user } = useAuthState();
  const [member, setMember] = useState({});
  const [customerPortalUrl, setCustomerPortalUrl] = useState();

  useEffect(() => {
    const getUser = async () => {
      const { data: {
        getMember: member
      }} = await API.graphql({ query: getMember, authMode: 'AWS_IAM', variables: { id: user.username } });
      setMember(member);
    };

    const getCustomerPortal = async () => {
      const returnUrl = `${window.location.origin}/app/profile`;
      const { url } = await API.post("public", "/customer-portal", {
        body: {
          returnUrl,
        },
      }).catch(e => {
        return {};
      });

      setCustomerPortalUrl(url);
    };

    getUser();
    getCustomerPortal();
  }, [user]);

  return (
    <div className="sm:mt-10 mb-4 lg:grid lg:grid-cols-12 lg:gap-x-5">
      <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
        <nav className="space-y-1">
          <Link
            to="#"
            className={`dark:bg-gray-800 text-teal-700 dark:text-teal-400 hover:text-teal-700 
            bg-white group rounded-md flex items-center
              shadow
            `}
            aria-current="page"
          >
            <span className="text-center inline-block align-middle p-3">
              
              <span className="truncate text-sm inline-block align-middle fa-2x font-medium"><i className="fas fa-user-circle mr-2 text-teal-500 dark:text-teal-400"></i> Account</span>
            </span>
          </Link>

          {customerPortalUrl && (
            <a
              href={customerPortalUrl}
              className="text-teal-700 dark:text-teal-400 hover:text-teal-700 
              bg-gray-50 hover:shadow hover:bg-white group rounded-md flex items-center
                "
            >
              <span className="text-gray-500 inline-block align-middle p-3">
                <span className="truncate text-sm inline-block align-middle fa-2x font-medium"><i className="text-teal-500 fas fa-credit-card mr-2"></i> Subscription</span>
              </span>
            </a>
          )}
        </nav>
      </aside>
      <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
        <ChessInfo {...member} />
        <AccountInfo {...member} />
      </div>
    </div>
  );
}

export default Profile;
