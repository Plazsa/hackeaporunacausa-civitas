Community
get post /community
get, put, delete /community/:id
get /community/:id/announcements
get /community/:id/volunteers
get /community/:id/members
get post put delete /community/:id/image

    HasA:
        Title
        Descriptions*
        website
        Cause
        Logo or Picture
        Creator (Staff)*
        Staff*
        Members?
        HQ Location
        Announcements (Blog)?
        Main Contact

    Can:
        Make an Announcement
        Hold Events

Volunteers
get? post /volunteer
get put delete /volunteer/:id
get? /volunteer/:id/userRatings
    HasA:
        Full Names
        Email
        occupation
        Summary
        Phone Numbers*
        Profile picture
        Badges
        Certification*
        SkillSet (tags)
        (Availability Time Frames)*
        Location
        Range*
        UserRatings (Points)


    Can:
        Add themselves to an event


UserRatings
get /userrating/:volunteerID

    HasA:
        volunteerID
        Aggregate of certificate
        Aggregate of comment ratings

Events
get post /event
get put delete /event/:id
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



?Questionnaire
    HasA:
        EventID
        GoogleDrive Url
    
    Can:
        Look up volunteers that actually volunteered

    Logic:
        Questionnaire for volunteers will be sent after Vetting the volunteer work.

?Managers

    Can:
        Accept an event volunteer vet
        Certify a volunteer
        Create Announcements
        Create Events
        Create announcements on events
        Vetting comments


?Comments
    Has:
        JoinID
        Author
        +1,-1 votes
        Posted Time
        Text
        Visible
        
?Donors
    Has:
        Name if not anon
        Amount donated
        ComunityID
        isPublic
    Can:
        Donate (duh...)
?(Sponsors
    Has:
        Comunities)

        Community
        Volunteer
        Follow a commmunity as a volunteer
        Create an event
        View volunteer Profile get/volunteer/:id
        View communities get /communities
        view profile
        view events


        Register
        Login
        view volunteers
        view volunteer

        view communities
        view community
        view events
        view event
        Create community
        create event

