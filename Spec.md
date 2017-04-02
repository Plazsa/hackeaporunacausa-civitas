Community
    HasA:
        Title
        Descriptions
        website
        Cause
        Logo or Picture
        Creator (Staff)
        Staff
        Members
        HQ Location
        Announcements (Blog)
        Main Contact

    Can:
        Make an Announcement
        Hold Events

Volunteers
    HasA:
        Full Names
        Email
        Summary
        Phone Numbers
        Profile pictures
        SkillSet (tags)
        (Availability Time Frames)
        Location
        Range
        UserRatings


    Can:
        Add themselves to an event


UserRatings
    HasA:
        Aggregate of comment ratings

Events
    HasA:
        Title
        Description
        Logo or image
        CommunityID
        Location
        StartDate
        EndDate
        Comments
        Ratings
        Announcements
        ListOfVolunteers
        (CapOfVolunteers)
    
    Can:
        Make an Announcement
        Pending volunteers (volunteer) 
        Accept Volunteers (Staff)



Questionnaire
    HasA:
        EventID
        GoogleDrive Url
    
    Can:
        Look up volunteers that actually volunteered

    Logic:
        Questionnaire for volunteers will be sent after Vetting the volunteer work.

Managers

    Can:
        Accept an event volunteer vet
        Certify a volunteer
        Create Announcements
        Create Events
        Create announcements on events
        Vetting comments


Comments
    Has:
        JoinID
        Author
        +1,-1 votes
        Posted Time
        Text
        Visible
        
Donors
    Has:
        Name if not anon
        Amount donated
        ComunityID
        isPublic
    Can:
        Donate (duh...)
(Sponsors
    Has:
        Comunities)