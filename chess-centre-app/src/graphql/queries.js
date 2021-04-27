/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPlan = /* GraphQL */ `
  query GetPlan($id: ID!) {
    getPlan(id: $id) {
      id
      key
      stripePriceId
      stripeProductId
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listPlans = /* GraphQL */ `
  query ListPlans(
    $filter: ModelPlanFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlans(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        key
        stripePriceId
        stripeProductId
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncPlans = /* GraphQL */ `
  query SyncPlans(
    $filter: ModelPlanFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPlans(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        key
        stripePriceId
        stripeProductId
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncEventTypes = /* GraphQL */ `
  query SyncEventTypes(
    $filter: ModelEventTypeFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncEventTypes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
        canRegister
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        stripePriceId
      }
      nextToken
      startedAt
    }
  }
`;
export const getEventType = /* GraphQL */ `
  query GetEventType($id: ID!) {
    getEventType(id: $id) {
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
      canRegister
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      stripePriceId
    }
  }
`;
export const listEventTypes = /* GraphQL */ `
  query ListEventTypes(
    $filter: ModelEventTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEventTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        canRegister
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        stripePriceId
      }
      nextToken
      startedAt
    }
  }
`;
export const getFidePlayer = /* GraphQL */ `
  query GetFidePlayer($id: ID!) {
    getFidePlayer(id: $id) {
      id
      fideId
      federation
      title
      currentRating
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listFidePlayers = /* GraphQL */ `
  query ListFidePlayers(
    $filter: ModelFidePlayerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFidePlayers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        fideId
        federation
        title
        currentRating
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncFidePlayers = /* GraphQL */ `
  query SyncFidePlayers(
    $filter: ModelFidePlayerFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncFidePlayers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        fideId
        federation
        title
        currentRating
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncMembers = /* GraphQL */ `
  query SyncMembers(
    $filter: ModelMemberFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncMembers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
        ecfRating
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
              ecfRating
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
              stripeCustomerId
              stripeCurrentPeriodEnd
              stripePriceId
              stripeProductId
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
            }
          }
          nextToken
          startedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const getMember = /* GraphQL */ `
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
      ecfRating
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
            ecfRating
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
              canRegister
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
export const listMembers = /* GraphQL */ `
  query ListMembers(
    $filter: ModelMemberFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMembers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        ecfRating
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
              ecfRating
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
              stripeCustomerId
              stripeCurrentPeriodEnd
              stripePriceId
              stripeProductId
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
            }
          }
          nextToken
          startedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const listEvents = /* GraphQL */ `
  query ListEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          canRegister
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          stripePriceId
        }
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
              ecfRating
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
              stripeCustomerId
              stripeCurrentPeriodEnd
              stripePriceId
              stripeProductId
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
            }
          }
          nextToken
          startedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
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
        canRegister
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        stripePriceId
      }
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
            ecfRating
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
              canRegister
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
export const eventsByStartDate = /* GraphQL */ `
  query EventsByStartDate(
    $startDate: AWSDate
    $name: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    eventsByStartDate(
      startDate: $startDate
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          canRegister
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          stripePriceId
        }
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
              ecfRating
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
              stripeCustomerId
              stripeCurrentPeriodEnd
              stripePriceId
              stripeProductId
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
            }
          }
          nextToken
          startedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const syncEvents = /* GraphQL */ `
  query SyncEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncEvents(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
          canRegister
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          stripePriceId
        }
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
              ecfRating
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
              stripeCustomerId
              stripeCurrentPeriodEnd
              stripePriceId
              stripeProductId
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
            }
          }
          nextToken
          startedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const getEntry = /* GraphQL */ `
  query GetEntry($id: ID!) {
    getEntry(id: $id) {
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
        ecfRating
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
              ecfRating
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
              stripeCustomerId
              stripeCurrentPeriodEnd
              stripePriceId
              stripeProductId
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
            }
          }
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
          canRegister
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          stripePriceId
        }
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
              ecfRating
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
              stripeCustomerId
              stripeCurrentPeriodEnd
              stripePriceId
              stripeProductId
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
            }
          }
          nextToken
          startedAt
        }
      }
    }
  }
`;
export const listEntrys = /* GraphQL */ `
  query ListEntrys(
    $filter: ModelEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEntrys(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
          ecfRating
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
            }
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
            canRegister
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            stripePriceId
          }
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
            }
            nextToken
            startedAt
          }
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const syncEntries = /* GraphQL */ `
  query SyncEntries(
    $filter: ModelEntryFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncEntries(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
          ecfRating
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
            }
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
            canRegister
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            stripePriceId
          }
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
            }
            nextToken
            startedAt
          }
        }
      }
      nextToken
      startedAt
    }
  }
`;
