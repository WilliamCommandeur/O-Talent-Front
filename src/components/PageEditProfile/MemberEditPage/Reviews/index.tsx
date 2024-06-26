import { useState } from "react";
import { deleteReview, modifyReview, requestWithVariable } from "../../../../utils";
import { queryDeleteReview, queryModifyReview } from "../../../../query";

export default function ReviewsEditProfilPageMember({ data }) {
  const [memberReviews, setMemberReviews] = useState(data.reviews);
  const [editModeId, setEditModeId] = useState(null);



  const deleteComment = async(idToDelete) => {
    const newComments = memberReviews.filter((comment) => comment.id !== idToDelete);
    setMemberReviews(newComments);
    const variables= {
      deleteReviewId: idToDelete
    }
    await requestWithVariable(queryDeleteReview, variables)
  };

  const handleChange = async (e, id) => {
    const value = e.target.value;

    const updatedReviews = memberReviews.map((review) => {
      if (review.id === id) {
        return { ...review, comment: value };
      }
      return review;
    });
    setMemberReviews(updatedReviews);
  };

  const handleEditMode = (id) => {

    setEditModeId(id);
  };
  

  const saveChanges = async (id, newComment) => {
    try {
      const variables = {
        modifyReviewId: id,
        input: {
          comment: newComment
        }
      };
  
      await requestWithVariable(queryModifyReview, variables);
  
      const updatedReviews = memberReviews.map((review) => {
        if (review.id === id) {
          return { ...review, comment: newComment };
        }
        return review;
      });
  
      setMemberReviews(updatedReviews);
      setEditModeId(null);
    } catch (error) {
      console.error('Erreur lors de la modification du commentaire :', error);
    }
  };
  

  return (
    <section className="">
      <h4 className="mt-5 mb-5">Vos commentaires</h4>
      <div className="flex flex-col gap-2 max-h-[400px] overflow-scroll">
      {memberReviews && memberReviews.map((review) => (
        <div className="border border-primary-color flex flex-col gap-2 relative rounded-md p-2 w-[80%]" key={review.id}>
          <h5>{review.training.label}</h5>
          {editModeId === review.id ? (
            <>
              <input type="text" value={review.comment} onChange={(e) => handleChange(e, review.id)} />
              <button onClick={() => saveChanges(review.id, review.comment)}>Enregistrer</button>
            </>
          ) : (
            <>
              <p>{review.comment}</p>
              <button className="material-symbols-rounded absolute top-0 right-2" onClick={() => handleEditMode(review.id)}>edit</button>
            </>
          )}
          <button className="material-symbols-rounded absolute top-0 right-10" onClick={() => deleteComment(review.id)}>delete</button>
        </div>
      ))}
      </div>
    </section>
  );
}
