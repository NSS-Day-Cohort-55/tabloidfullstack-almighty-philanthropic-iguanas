select * from userprofile
update userprofile
set FirebaseUserId = 'BfMeGiBmrBTUn2nhQWUrFmZeyqY2'
where id = 1

update userprofile
set FirebaseUserId = 'uxZ028HZyaf8JGc1rQCc3Py8PDm2'
where id = 2

SELECT p.Id, p.Title, p.Content, 
                              p.ImageLocation AS HeaderImage,
                              p.CreateDateTime, p.PublishDateTime, p.IsApproved,
                              p.CategoryId, p.UserProfileId,
                              c.[Name] AS CategoryName,
                              u.FirstName, u.LastName, u.DisplayName, 
                              u.Email, u.CreateDateTime, u.ImageLocation AS AvatarImage,
                              u.UserTypeId, 
                              ut.[Name] AS UserTypeName,
                              r.Name, pr.UserProfileId, r.Id
                         FROM Post p
                              LEFT JOIN Category c ON p.CategoryId = c.id
                              LEFT JOIN UserProfile u ON p.UserProfileId = u.id
                              LEFT JOIN UserType ut ON u.UserTypeId = ut.id
                              LEFT JOIN PostReaction pr on pr.PostId = p.Id
                              LEFT JOIN Reaction r on r.Id = pr.ReactionId
                        WHERE IsApproved = 1 AND PublishDateTime < SYSDATETIME()
                              AND p.id = 1

                              insert into PostReaction (ReactionId, PostId, UserProfileId)
                              values (2, 1, 2)

                              delete from postreaction where postreaction.userprofileid = 2


                              select * from PostReaction


                             if exists (select * from postreaction where postreaction.ReactionId = 2 AND postreaction.PostId = 1 AND postreaction.UserProfileId = 2)
                             delete from postreaction where postreaction.ReactionId = 2 AND postreaction.PostId = 1 AND postreaction.UserProfileId = 2
                             else
                             insert into PostReaction (ReactionId, PostId, UserProfileId)
                             values (2, 1, 2)

                                                 select Id, Name, ImageLocation from reaction

                                                 delete from reaction where reaction.id = 4


select CAST (ReactionId as varchar) as ReactionId, count(reactionId) as NumOfReactions 
                                        from postreaction where postId = 1
                                        group by ReactionId

delete from postreaction
                                        select * from reaction