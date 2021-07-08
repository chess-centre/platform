/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBroadcast = /* GraphQL */ `
  query GetBroadcast($id: ID!) {
    getBroadcast(id: $id) {
      id
      buttonName
      isLive
      description
      name
      pageUrl
      dgtUrl
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listBroadcasts = /* GraphQL */ `
  query ListBroadcasts(
    $filter: ModelBroadcastFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBroadcasts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        buttonName
        isLive
        description
        name
        pageUrl
        dgtUrl
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
export const syncBroadcasts = /* GraphQL */ `
  query SyncBroadcasts(
    $filter: ModelBroadcastFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncBroadcasts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        buttonName
        isLive
        description
        name
        pageUrl
        dgtUrl
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
export const getResult = /* GraphQL */ `
  query GetResult($id: ID!) {
    getResult(id: $id) {
      id
      pairings
      results
      players
      eventID
      name
      complete
      live
      winner
      dgtCloudUrl
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listResults = /* GraphQL */ `
  query ListResults(
    $filter: ModelResultFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listResults(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        pairings
        results
        players
        eventID
        name
        complete
        live
        winner
        dgtCloudUrl
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
export const syncResults = /* GraphQL */ `
  query SyncResults(
    $filter: ModelResultFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncResults(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        pairings
        results
        players
        eventID
        name
        complete
        live
        winner
        dgtCloudUrl
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
export const getGame = /* GraphQL */ `
  query GetGame($id: ID!) {
    getGame(id: $id) {
      id
      pgn
      opponent
      colour
      result
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listGames = /* GraphQL */ `
  query ListGames(
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        pgn
        opponent
        colour
        result
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
export const syncGames = /* GraphQL */ `
  query SyncGames(
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncGames(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        pgn
        opponent
        colour
        result
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
      stripePriceId
      timeControl
      eventType
      defaultPrice
      canRegister
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
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
        stripePriceId
        timeControl
        eventType
        defaultPrice
        canRegister
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
        stripePriceId
        timeControl
        eventType
        defaultPrice
        canRegister
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
        ecfRating
        membershipType
        gameInfo
        ratingInfo
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
              ecfRating
              membershipType
              gameInfo
              ratingInfo
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
              complete
              cancelled
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
      ecfRating
      membershipType
      gameInfo
      ratingInfo
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
            ecfRating
            membershipType
            gameInfo
            ratingInfo
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
            complete
            cancelled
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            results {
              nextToken
              startedAt
            }
            type {
              id
              name
              description
              url
              color
              time
              maxEntries
              stripePriceId
              timeControl
              eventType
              defaultPrice
              canRegister
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
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
        ecfRating
        membershipType
        gameInfo
        ratingInfo
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
              ecfRating
              membershipType
              gameInfo
              ratingInfo
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
              complete
              cancelled
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
      complete
      cancelled
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      results {
        items {
          id
          pairings
          results
          players
          eventID
          name
          complete
          live
          winner
          dgtCloudUrl
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      type {
        id
        name
        description
        url
        color
        time
        maxEntries
        stripePriceId
        timeControl
        eventType
        defaultPrice
        canRegister
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
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
            ecfRating
            membershipType
            gameInfo
            ratingInfo
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
            complete
            cancelled
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            results {
              nextToken
              startedAt
            }
            type {
              id
              name
              description
              url
              color
              time
              maxEntries
              stripePriceId
              timeControl
              eventType
              defaultPrice
              canRegister
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
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
        complete
        cancelled
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        results {
          items {
            id
            pairings
            results
            players
            eventID
            name
            complete
            live
            winner
            dgtCloudUrl
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
          }
          nextToken
          startedAt
        }
        type {
          id
          name
          description
          url
          color
          time
          maxEntries
          stripePriceId
          timeControl
          eventType
          defaultPrice
          canRegister
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
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
              ecfRating
              membershipType
              gameInfo
              ratingInfo
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
              complete
              cancelled
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
        complete
        cancelled
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        results {
          items {
            id
            pairings
            results
            players
            eventID
            name
            complete
            live
            winner
            dgtCloudUrl
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
          }
          nextToken
          startedAt
        }
        type {
          id
          name
          description
          url
          color
          time
          maxEntries
          stripePriceId
          timeControl
          eventType
          defaultPrice
          canRegister
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
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
              ecfRating
              membershipType
              gameInfo
              ratingInfo
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
              complete
              cancelled
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
        complete
        cancelled
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        results {
          items {
            id
            pairings
            results
            players
            eventID
            name
            complete
            live
            winner
            dgtCloudUrl
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
          }
          nextToken
          startedAt
        }
        type {
          id
          name
          description
          url
          color
          time
          maxEntries
          stripePriceId
          timeControl
          eventType
          defaultPrice
          canRegister
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
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
              ecfRating
              membershipType
              gameInfo
              ratingInfo
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
              complete
              cancelled
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
        ecfRating
        membershipType
        gameInfo
        ratingInfo
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
              ecfRating
              membershipType
              gameInfo
              ratingInfo
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
              complete
              cancelled
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
        complete
        cancelled
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        results {
          items {
            id
            pairings
            results
            players
            eventID
            name
            complete
            live
            winner
            dgtCloudUrl
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
          }
          nextToken
          startedAt
        }
        type {
          id
          name
          description
          url
          color
          time
          maxEntries
          stripePriceId
          timeControl
          eventType
          defaultPrice
          canRegister
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
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
              ecfRating
              membershipType
              gameInfo
              ratingInfo
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
              complete
              cancelled
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
          ecfRating
          membershipType
          gameInfo
          ratingInfo
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
          complete
          cancelled
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          results {
            items {
              id
              pairings
              results
              players
              eventID
              name
              complete
              live
              winner
              dgtCloudUrl
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
            }
            nextToken
            startedAt
          }
          type {
            id
            name
            description
            url
            color
            time
            maxEntries
            stripePriceId
            timeControl
            eventType
            defaultPrice
            canRegister
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
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
          ecfRating
          membershipType
          gameInfo
          ratingInfo
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
          complete
          cancelled
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          results {
            items {
              id
              pairings
              results
              players
              eventID
              name
              complete
              live
              winner
              dgtCloudUrl
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
            }
            nextToken
            startedAt
          }
          type {
            id
            name
            description
            url
            color
            time
            maxEntries
            stripePriceId
            timeControl
            eventType
            defaultPrice
            canRegister
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
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
